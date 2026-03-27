import type { SiteScraper } from "../types"

export const HelloWorkScraper: SiteScraper = {
  name: "HelloWork",
  isCurrentSite: (url) => url.includes("hellowork.com"),

  getJobCards: () => {
    return document.querySelectorAll(
      'div[data-controller="hide-offer"] ul > li'
    )
  },

  getCompanyName: (element) => {
    const companyElement = element.querySelector(
      '[data-cy="offerTitle"] p.tw-typo-s'
    ) as HTMLElement
    return companyElement?.innerText?.trim() || null
  },

  hideElement: (element) => {
    element.style.display = "none"
  }
}
