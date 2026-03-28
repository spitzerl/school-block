import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import defaultSchools from "../schools.json"
import { HelloWorkScraper } from "./sites/hellowork"
import { IndeedScraper } from "./sites/indeed"
import type { SiteScraper } from "./types"

export const config: PlasmoCSConfig = {
  matches: ["*://*.indeed.com/*", "*://*.indeed.fr/*", "*://*.hellowork.com/*"]
}

const storage = new Storage()
const scrapers: SiteScraper[] = [IndeedScraper, HelloWorkScraper]

// Fonction : liste noire finale (ecoles par défaut + ajoutées manuellement)
async function getBlacklist(): Promise<string[]> {
  const isGlobalActive = (await storage.get("isFilterActive")) ?? true
  if (!isGlobalActive) return []

  const [
    filterBusiness,
    filterTech,
    filterOthers,
    customSchools,
    inactiveDefaults
  ] = await Promise.all([
    storage.get("filterBusiness").then((v) => v ?? true),
    storage.get("filterTech").then((v) => v ?? true),
    storage.get("filterOthers").then((v) => v ?? true),
    storage.get<string[]>("customSchools").then((v) => v || []),
    storage.get<string[]>("inactiveDefaults").then((v) => v || [])
  ])

  let blacklist: string[] = [...customSchools]

  const addCategory = (category: string[]) => {
    blacklist.push(...category.filter((s) => !inactiveDefaults.includes(s)))
  }

  if (filterBusiness) addCategory(defaultSchools.categories.business_schools)
  if (filterTech) addCategory(defaultSchools.categories.tech_schools)
  if (filterOthers) addCategory(defaultSchools.categories.others)

  return blacklist.map((s) => s.toLowerCase())
}

function applyFilter(scraper: SiteScraper, blacklist: string[]) {
  const cards = scraper.getJobCards()

  cards.forEach((card) => {
    if (card.getAttribute("data-filtered") === "true") return

    const companyName = scraper.getCompanyName(card)?.toLowerCase()

    if (companyName) {
      const isBanned = blacklist.some((school) => companyName.includes(school))

      if (isBanned) {
        scraper.hideElement(card)
        card.setAttribute("data-filtered", "true")
        console.log(`🛡️ [${scraper.name}] Masqué : ${companyName}`)
      }
    }
  })
}

async function init() {
  const currentUrl = window.location.href
  const scraper = scrapers.find((s) => s.isCurrentSite(currentUrl))

  if (!scraper) return

  const blacklist = await getBlacklist()
  if (blacklist.length === 0) return

  applyFilter(scraper, blacklist)

  const observer = new MutationObserver(() => applyFilter(scraper, blacklist))
  observer.observe(document.body, { childList: true, subtree: true })

  storage.watch({
    isFilterActive: () => window.location.reload(),
    filterBusiness: () => window.location.reload(),
    filterTech: () => window.location.reload(),
    filterOthers: () => window.location.reload(),
    customSchools: () => window.location.reload(),
    inactiveDefaults: () => window.location.reload()
  })
}

init()
