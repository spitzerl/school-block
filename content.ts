import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import defaultSchools from "./schools.json"

export const config: PlasmoCSConfig = {
  matches: ["*://*.indeed.com/*", "*://*.indeed.fr/*"]
}

const storage = new Storage()

// Fonction : liste noire finale (ecoles par défaut + ajoutées manuellement)
async function getBlacklist() {
  const isGlobalActive = (await storage.get("isFilterActive")) ?? true
  if (!isGlobalActive) return []

  const filterBusiness = (await storage.get("filterBusiness")) ?? true
  const filterTech = (await storage.get("filterTech")) ?? true
  const filterOthers = (await storage.get("filterOthers")) ?? true

  const customSchools = (await storage.get<string[]>("customSchools")) || []
  const inactiveDefaults =
    (await storage.get<string[]>("inactiveDefaults")) || [] // NOUVEAU

  let blacklist: string[] = [...customSchools]

  if (filterBusiness) {
    blacklist.push(
      ...defaultSchools.categories.business_schools.filter(
        (s) => !inactiveDefaults.includes(s)
      )
    )
  }
  if (filterTech) {
    blacklist.push(
      ...defaultSchools.categories.tech_schools.filter(
        (s) => !inactiveDefaults.includes(s)
      )
    )
  }
  if (filterOthers) {
    blacklist.push(
      ...defaultSchools.categories.others.filter(
        (s) => !inactiveDefaults.includes(s)
      )
    )
  }

  return blacklist.map((school) => school.toLowerCase())
}

function hideJobCards(blacklist: string[]) {
  if (blacklist.length === 0) return

  const jobCards = document.querySelectorAll(".job_seen_beacon")

  jobCards.forEach((card) => {
    if (card.getAttribute("data-filtered") === "true") return

    const companyNameElement = card.querySelector(
      '[data-testid="company-name"]'
    )

    if (companyNameElement && companyNameElement.textContent) {
      const companyName = companyNameElement.textContent.toLowerCase()

      // Vérification si nom de l'entreprise est dans la liste
      const isBanned = blacklist.some((school) => companyName.includes(school))

      if (isBanned) {
        // Masquage offre
        ;(card as HTMLElement).style.display = "none"

        card.setAttribute("data-filtered", "true")

        console.log(`🛡️ Job Filter: Offre masquée -> ${companyName}`)
      }
    }
  })
}

// Initialisation
async function init() {
  const blacklist = await getBlacklist()

  // Filtrage au chargement de la page
  hideJobCards(blacklist)

  // Relancer le filtre quand les nouveaux éléments apparaissent
  const observer = new MutationObserver(() => {
    hideJobCards(blacklist)
  })

  observer.observe(document.body, { childList: true, subtree: true })

  // Refresh quand un réglage est modifié
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
