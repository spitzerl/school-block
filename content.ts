import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import defaultSchools from "./schools.json"

// On cible Indeed France et International
export const config: PlasmoCSConfig = {
  matches: ["*://*.indeed.com/*", "*://*.indeed.fr/*"]
}

const storage = new Storage()

// Fonction pour récupérer la liste noire finale
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

  // Pour chaque catégorie, on n'ajoute que les écoles qui ne sont pas dans "inactiveDefaults"
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

// Fonction qui parcours la page et masque les offres
function hideJobCards(blacklist: string[]) {
  if (blacklist.length === 0) return

  // Sur Indeed, chaque offre est généralement contenue dans une "div" avec la classe "job_seen_beacon"
  const jobCards = document.querySelectorAll(".job_seen_beacon")

  jobCards.forEach((card) => {
    // Si on a déjà masqué cette carte, on passe à la suivante
    if (card.getAttribute("data-filtered") === "true") return

    // On cherche l'élément contenant le nom de l'entreprise
    const companyNameElement = card.querySelector(
      '[data-testid="company-name"]'
    )

    if (companyNameElement && companyNameElement.textContent) {
      const companyName = companyNameElement.textContent.toLowerCase()

      // On vérifie si un mot de la blacklist est présent dans le nom de l'entreprise
      const isBanned = blacklist.some((school) => companyName.includes(school))

      if (isBanned) {
        // C'est une école ! On masque l'offre complètement en CSS
        ;(card as HTMLElement).style.display = "none"

        // On marque la carte pour ne pas la rescanner inutilement au prochain défilement
        card.setAttribute("data-filtered", "true")

        console.log(`🛡️ Job Filter: Offre masquée -> ${companyName}`)
      }
    }
  })
}

// Initialisation au lancement de la page
async function init() {
  const blacklist = await getBlacklist()

  // 1er passage au chargement initial
  hideJobCards(blacklist)

  // Comme Indeed charge les offres au fur et à mesure qu'on scrolle (sans recharger la page),
  // On met un "observateur" qui relancera le filtre dès qu'il détecte de nouveaux éléments.
  const observer = new MutationObserver(() => {
    hideJobCards(blacklist)
  })

  observer.observe(document.body, { childList: true, subtree: true })

  // Optionnel : Si on change un réglage dans le menu, on rafraîchit la page pour appliquer les modifications
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
