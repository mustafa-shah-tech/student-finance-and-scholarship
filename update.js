const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\musst\\Desktop\\student-finance-hub';
const files = [
    'eligibility-checker.html',
    'loan-calculator.html',
    'cgpa-calculator.html',
    'deadlines.html',
    'scholarships.html',
    'about.html',
    'privacy-policy.html'
];

const sharedStyles = `    <!-- Shared Styles -->
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/components.css">
</head>`;

const scriptMap = {
    'eligibility-checker.html': `<script src="assets/js/scholarships-data.js"></script>\n    <script src="assets/js/eligibility.js"></script>`,
    'loan-calculator.html': `<script src="assets/js/loan-calculator.js"></script>`,
    'cgpa-calculator.html': `<script src="assets/js/cgpa-calculator.js"></script>`,
    'deadlines.html': `<script src="assets/js/scholarships-data.js"></script>\n    <script src="assets/js/deadlines.js"></script>`,
    'scholarships.html': `<script src="assets/js/scholarships-data.js"></script>\n    <script src="assets/js/scholarships.js"></script>`,
    'about.html': ``,
    'privacy-policy.html': ``
};

const metaMap = {
    'eligibility-checker.html': {
        desc: "Enter your CGPA, degree level and province to instantly find every Pakistani scholarship you qualify for. Free eligibility checker — no signup required.",
        title: "Eligibility Checker - Pakistan Student Finance Hub"
    },
    'loan-calculator.html': {
        desc: "Calculate monthly installments for Pakistani student loans including PM Youth Loan, HBL and Bank Alfalah education loans. Free EMI calculator in PKR.",
        title: "Loan Calculator - Pakistan Student Finance Hub"
    },
    'cgpa-calculator.html': {
        desc: "Free CGPA calculator for Pakistani students. Calculate semester GPA, convert percentage to CGPA, and plan your target grade on a 4.0 scale.",
        title: "CGPA Calculator - Pakistan Student Finance Hub"
    },
    'deadlines.html': {
        desc: "Track upcoming scholarship deadlines in Pakistan. Get alerts before HEC, provincial, and international scholarship applications close.",
        title: "Deadline Tracker - Pakistan Student Finance Hub"
    },
    'scholarships.html': {
        desc: "Browse a comprehensive list of HEC, provincial, and international scholarships available for Pakistani students. Filter by degree and province.",
        title: "All Scholarships - Pakistan Student Finance Hub"
    },
    'about.html': {
        desc: "About PakStudentFinance — a free platform helping Pakistani students discover scholarships and plan their education financing.",
        title: "About Us - Pakistan Student Finance Hub"
    },
    'privacy-policy.html': {
        desc: "Privacy policy for PakStudentFinance. Learn how we handle your data, cookies, and Google AdSense on our platform.",
        title: "Privacy Policy - Pakistan Student Finance Hub"
    }
};

files.forEach(f => {
    let p = path.join(dir, f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf-8');

    // Make sure Favicon and og:url are present before <title>
    // We'll replace the entire meta description and title block
    const metaTitleRegex = /<meta name="description"[\s\S]*?<title>.*?<\/title>/gi;
    const replacementMeta = `<meta name="description" content="${metaMap[f].desc}">
    <meta property="og:url" content="https://mustafa-shah-tech.github.io/student-finance-hub/${f}">
    <title>${metaMap[f].title}</title>
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size=''90''>🎓</text></svg>">`;

    if (content.match(metaTitleRegex)) {
        content = content.replace(metaTitleRegex, replacementMeta);
    }

    // Replace <style> block
    if (content.includes('<style>') && content.includes('</style>')) {
        content = content.replace(/<style>[\s\S]*?<\/style>[\s\S]*?<\/head>/i, sharedStyles);
    }

    // Replace <script> blocks (skip bootstrap script which has a src and no body, match the long <script> that holds logic)
    // The logic scripts don't have src.
    const scriptRegex = /<script>(?![\s\S]*?<\/script>[\s\S]*<script>)[\s\S]*?<\/script>/i; // Match the last script block or just any script without src that contains `const ` or logic
    if (content.match(/<script>[\s\S]*?<\/script>/g)) {
        const matches = content.match(/<script>[\s\S]*?<\/script>/g);
        if (matches && matches.length > 0) {
            // Find the one that's NOT bootstrap (i.e. does not have src or contains logic)
            // But actually we know there is exactly one <script>...</script> with the inline logic in these files
            matches.forEach(m => {
                if (!m.includes('src=')) {
                    content = content.replace(m, scriptMap[f]);
                }
            });
        }
    }

    // specific fix for about.html and privacy-policy.html where there's no script block to replace, but maybe we need to insert it?
    // Actually they don't need any custom scripts

    // Fix the navbar bug
    content = content.replace(/data-bs-target=""/g, 'data-bs-target="#navbarNav"');

    fs.writeFileSync(p, content, 'utf-8');
});
console.log('All files updated successfully!');
