<div align="center">
  <h1>Student Finance & Scholarship</h1>
  <p><strong>Pakistan Student Finance & Scholarship Hub</strong></p>

  [![Live Site](https://img.shields.io/badge/Live-Site-success?style=for-the-badge&logo=vercel)](https://mustafa-shah-tech.github.io/student-finance-and-scholarship)
  [![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=for-the-badge&logo=github)](https://mustafa-shah-tech.github.io/student-finance-and-scholarship)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
  [![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
</div>

---

## Overview

Student Finance & Scholarship is a free, ad-supported web utility platform designed specifically for Pakistani students. Every year, billions of rupees in scholarships go unawarded because students simply do not know they exist, or find the eligibility criteria too confusing to navigate. This platform was built to solve that problem.

We provide a centralized hub for discovering scholarships, grants, and education loans available across all provinces in Pakistan. With built-in tools like an eligibility checker, loan EMI calculator, CGPA converter, and deadline tracker, students can easily manage their higher education financing.

The platform is strictly free to use. There are no paywalls, no hidden fees, and absolutely zero signup required. It is built as a lightweight, mobile-first static site that is fast and accessible for all students, regardless of their connection speed or device.

## Live Demo

🚀 **[View the Live Site Here](https://mustafa-shah-tech.github.io/student-finance-and-scholarship)**

Visitors can immediately start using the tools, inputting their CGPA and degree level to find matching scholarships, calculating loan installments, tracking upcoming application deadlines, or browsing the full database of financial aid opportunities.

## Features

*   **Scholarship Eligibility Checker:** A personalized matching tool. Enter your academic score (CGPA or percentage), degree level, province, and financial need status to instantly see a filtered list of scholarships you fully or partially qualify for.
*   **Student Loan EMI Calculator:** Plan your education financing with real-time estimates. Choose from pre-filled popular Pakistani youth and education loans or enter custom interest rates to calculate monthly installments, total interest, and visualize the repayment breakdown.
*   **CGPA Calculator:** Calculate your semester GPA, convert between standard 4.0 scale CGPA and percentage formats, and use the target planner to figure out the grades you need in remaining courses to hit your academic goals.
*   **Scholarship Deadline Tracker:** A dynamic dashboard that sorts upcoming scholarships by closing date. It features color-coded urgency badges and a countdown timer so you never miss an application.

**Additional Highlights:**
*   **15+ Scholarships:** A robust starting database of active scholarships, grants, and loans.
*   **AdSense-Ready:** Fully prepared with designated, responsive placeholder slots for Google AdSense integration to support server costs.
*   **Mobile Responsive:** A mobile-first design system utilizing Bootstrap 5 ensures seamless operation on any screen size.
*   **Zero Backend:** Entirely static architecture. All logic runs locally in the browser for maximum speed and privacy.

## Pages

| File | Purpose | Status |
| :--- | :--- | :--- |
| `index.html` | Homepage — hero section, feature highlights, and featured scholarships. | Live |
| `eligibility-checker.html` | User input form and dynamic filtering logic for scholarship matches. | Live |
| `loan-calculator.html` | Interactive EMI calculator with sliders and visual breakdowns. | Live |
| `cgpa-calculator.html` | Multi-tool page for GPA calculation, conversion, and goal targeting. | Live |
| `deadlines.html` | Chronological list of deadlines with countdown timers and categorizations. | Live |
| `scholarships.html` | Full browsable searchable directory of all tracked scholarships. | Live |
| `about.html` | Platform mission statement and user feedback contact form. | Live |
| `privacy-policy.html` | Comprehensive privacy documentation required for AdSense approval. | Live |

## Tech Stack

| Technology | Purpose | Cost |
| :--- | :--- | :--- |
| **HTML5** | Semantic structure and markup for all pages. | Free |
| **CSS3** | Custom styling, variables, and responsive design systems. | Free |
| **Bootstrap 5** | Responsive grid system and utility classes via CDN. | Free |
| **Vanilla JavaScript** | All interactive logic, calculations, and data filtering. | Free |
| **GitHub Pages** | Fast, reliable static hosting and deployment. | Free |

## Getting Started (Local Development)

Because this platform uses a zero-build-tool architecture, running it locally is incredibly simple.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mustafa-shah-tech/student-finance-and-scholarship.git
    cd student-finance-and-scholarship
    ```
2.  **Open any file:**
    Simply double-click `index.html` (or any other `.html` file) in your file explorer to open it directly in your web browser. 

*No build tools, no `npm install`, and no local server are required.*

## Scholarship Database

The scholarship data is not fetched from an external API or database. To maintain zero-latency load times and simplicity, it is stored as a constant JavaScript array directly within the `<script>` tags of the relevant HTML files (`index.html`, `eligibility-checker.html`, `deadlines.html`, `scholarships.html`).

**Adding a New Scholarship:**
To add an entry, append a new object to the `scholarships` array following this exact structure. Ensure you update the array in *all* files that utilize it.

```javascript
{
  id: 16, // Unique incremental ID
  name: "Example Foundation Scholarship",
  funder: "Example Foundation",
  amount: "PKR 50,000/year",
  amountUSD: null,
  type: "need-based", // Options: "need-based", "merit", "loan", "need-merit"
  degreeLevel: ["bachelor", "master"], // Options: "intermediate", "bachelor", "master", "phd"
  minCGPA: 3.0,
  cgpaScale: 4.0,
  requiresFinancialNeed: true,
  institution: "any-public",
  province: "sindh", // Options: "all", "punjab", "sindh", "kpk", "balochistan", "ajk", "gb", "federal"
  nationality: "pakistani",
  deadline: "2026-05-30", // Format: YYYY-MM-DD
  applyURL: "https://example.com/apply",
  description: "Brief description of the scholarship purpose.",
  tags: ["need-based", "provincial", "undergraduate"]
}
```

## Monetization

To keep this tool 100% free for students, the platform is designed to be supported by **Google AdSense**. 

*   **AdSense Slots:** Visible `<!-- ADSENSE SLOT -->` comments and gray placeholder boxes are strategically placed above the fold and between major content sections across all pages.
*   **Integration:** Once the AdSense account is approved, simply replace the placeholder HTML `<div>` blocks with the provided JavaScript snippets from Google.
*   **Niche Performance:** Given the highly specific constraints of "education", "finance", and "loans", this niche typically yields a favorable CPM compared to general entertainment traffic.

## Roadmap

- [x] Build all 8 pages
- [x] Add 15 scholarships to database
- [x] Deploy to GitHub Pages
- [x] Professional file structure
- [x] Fix navbar mobile toggle
- [x] Add dark/light mode toggle
- [x] Add branded favicon
- [x] Add SEO meta tags and keywords
- [x] Create sitemap.xml and robots.txt
- [x] Inject JSON-LD Schema on tools pages
- [ ] Submit to Google Search Console
- [ ] Apply for Google AdSense
- [ ] Reach 100 daily visitors
- [ ] Expand scholarship database to 40+
- [ ] Add email alert integration (Mailchimp)
- [ ] Reach first AdSense revenue

## Contributing

We welcome contributions to help Pakistani students! Whether it's adding a new scholarship to the database, fixing a bug, or proposing a new calculator tool, your help is appreciated.

*   To add a scholarship, follow the structure in the [Scholarship Database](#scholarship-database) section and submit a Pull Request updating all relevant arrays.
*   To report bugs or suggest features, feel free to use the feedback form on the [About Page](about.html) or open an issue on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This platform provides general information only. While we strive to keep details accurate and up-to-date, scholarship availability, deadlines, and criteria are subject to change. Users should always verify all terms, conditions, and eligibility details directly with the respective scholarship providers or financial institutions before applying.

