import type { SiteScraper } from "../types"

export const WelcomeToTheJungleScrapper: SiteScraper = {
  name: "Welcome To The Jungle",

  isCurrentSite: (url) => url.includes("welcometothejungle.com"),

  getJobCards: () => {
    return document.querySelectorAll(
      "ul[data-testid='search-results'] > li[data-testid='search-results-list-item-wrapper']"
    ) as NodeListOf<HTMLElement>
  },

  getCompanyName: (element) => {
    const companySpan = element.querySelector(
      ".sc-jkYWRr, .sc-tZagl, span.wui-text"
    ) as HTMLElement

    return companySpan?.innerText?.trim() || null
  },

  hideElement: (element) => {
    element.style.display = "none"
  }
}
