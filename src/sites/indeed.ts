import type { SiteScraper } from "../types"

export const IndeedScraper: SiteScraper = {
  name: "Indeed",
  isCurrentSite: (url) => url.includes("indeed.com"),

  getJobCards: () => {
    return document.querySelectorAll(".job_seen_beacon")
  },

  getCompanyName: (element) => {
    const companySpan = element.querySelector(".companyName") as HTMLElement
    return companySpan?.innerText?.trim() || null
  },

  hideElement: (element) => {
    element.style.display = "none"
  }
}
