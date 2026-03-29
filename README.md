# School Block - Hide School Ads on Job Search Sites

[Version Française](./README-fr.md)

**School Block** is a browser extension (Chrome & Firefox) designed to clean up your job search. It automatically detects and hides listings posted by schools, training centers, or career change organizations directly on recruitment platforms.

## ⚠️ Important Disclaimer

This extension relies on the **company name** published in the job offer to apply filters. Consequently:

* **False Positives:** If a company's name contains a school's name (e.g., "Studio 42"), the offer will be hidden because of the "42" blacklist entry.
* **Internal Positions Hidden:** If you are looking for a job *at* a school (e.g., IT technician for Epitech or accountant for HEC), these offers will also be hidden by the filter.
* **Site Updates:** The extension reads the structure (HTML/CSS) of job boards. If a site like Indeed updates its interface, the filter may temporarily stop working until an update is deployed.

## Features

* **Automatic Filtering:** Instant hiding of pre-registered schools and training centers (can be disabled in the extension menu).
* **Manual Additions:** Add your own keywords or schools directly from the extension menu.

## Supported Job Boards

The goal is to cover the platforms most heavily affected by these types of ads.

- [x] **Indeed**
- [x] **Welcome to the Jungle**
- [x] **HelloWork**
- [ ] **LinkedIn** (Coming Soon)


## Default Filtered Schools

The extension maintains an extensive list of business schools, tech bootcamps, and online training organizations.

To view the full list of blocked entities or to suggest a new one, please refer to the configuration file: **[schools.json](./schools.json)**

## Installation & Local Build

This project uses [Plasmo](https://docs.plasmo.com/), Node.js, and React.

### Prerequisites
* **Node.js** (v16 or higher)
* **npm**, **pnpm**, or **yarn**

### Steps
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/spitzerl/school-block.git](https://github.com/spitzerl/school-block.git)
    cd school-block
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server (Hot Reload):**
    * **Chrome / Chromium:** `npm run dev:chrome`
    * **Firefox:** `npm run dev:firefox`
4.  **Build for production:**
    * `npm run build:chrome` or `npm run build:firefox`
    * *The compiled extension will be found in the `build/` folder.*

## Contributing

Contributions are welcome! Whether you want to add new schools to the list or fix a site filter that no longer works, feel free to get involved.

> [!TIP]
> Not comfortable with code? Simply open an **issue** detailing the missing school or the site that is causing problems, and I'll take care of it!
