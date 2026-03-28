import type { SiteScraper } from "../types"

export const IndeedScraper: SiteScraper = {
  name: "Indeed",
  isCurrentSite: (url) =>
    url.includes("indeed.com") || url.includes("indeed.fr"),

  getJobCards: () => {
    return document.querySelectorAll(
      ".job_seen_beacon, [data-testid='slider_item'], .jobsearch-RightPane, .jobsearch-ViewJobLayout-jobDisplay, #viewJobSSRRoot"
    ) as NodeListOf<HTMLElement>
  },

  getCompanyName: (element) => {
    const companySpan = element.querySelector(
      ".companyName, [data-testid='company-name'], [data-testid='inlineHeader-companyName'], .jobsearch-JobInfoHeader-companyName, a[data-tn-element='companyName']"
    ) as HTMLElement
    return companySpan?.innerText?.trim() || null
  },

  hideElement: (element) => {
    element.style.display = "none"
  }
}
