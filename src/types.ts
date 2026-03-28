export interface SiteScraper {
  name: string
  isCurrentSite: (url: string) => boolean
  getCompanyName: (element: HTMLElement) => string | null
  getJobCards: () => NodeListOf<HTMLElement>
  hideElement: (element: HTMLElement) => void
}
