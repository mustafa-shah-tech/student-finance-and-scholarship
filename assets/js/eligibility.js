// ============================================
// FILE: assets/js/eligibility.js
// PURPOSE: Logic for eligibility-checker.html to match user profile to scholarships
// DEPENDS ON: scholarships-data.js
// ============================================

const scoreToggle = document.getElementById('score-toggle');
const scoreInput = document.getElementById('score-input');

scoreToggle.addEventListener('change', function () {
    if (this.checked) {
        scoreInput.placeholder = "e.g. 85.5 (%)";
        scoreInput.max = "100";
    } else {
        scoreInput.placeholder = "e.g. 3.50 (CGPA)";
        scoreInput.max = "4.0";
    }
});

function getDaysRemaining(deadlineStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineStr);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diff;
}

document.getElementById('checker-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!document.getElementById('nationality-pk').checked) {
        return;
    }

    let cgpa = parseFloat(scoreInput.value);
    if (scoreToggle.checked) {
        cgpa = cgpa / 25; // convert percentage to CGPA on 4.0 scale
    }

    const degree = document.getElementById('degree-level').value;
    const province = document.getElementById('province').value;
    const needObj = document.querySelector('input[name="financial-need"]:checked').value;
    const hasNeed = (needObj === 'yes' || needObj === 'not-sure');

    const fullyEligible = [];
    const borderline = [];

    scholarships.forEach(s => {
        const degreeMatch = s.degreeLevel.includes(degree);
        const provinceMatch = (s.province === 'all' || s.province === province);
        const needMatch = (!s.requiresFinancialNeed || hasNeed);

        if (degreeMatch && provinceMatch && needMatch) {
            if (cgpa >= s.minCGPA) {
                fullyEligible.push(s);
            } else if (cgpa >= (s.minCGPA - 0.3)) {
                borderline.push(s);
            }
        }
    });

    // sort by deadline ascending
    fullyEligible.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    borderline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    renderResults(fullyEligible, borderline, cgpa);
});

function renderScholarshipCard(s) {
    const daysObj = getDaysRemaining(s.deadline);
    let deadlineStr = `Closing ${new Date(s.deadline).toLocaleDateString()} (${daysObj > 0 ? daysObj + " days left" : "Ended"})`;

    return `
        <div class="scholarship-card">
            <span class="badge-type badge-${s.type}">${s.type.replace('-', ' ')}</span>
            <h4 style="color:var(--primary-blue); font-size:1.2rem;">${s.name}</h4>
            <p class="mb-1 text-secondary"><strong>Funder:</strong> ${s.funder}</p>
            <p class="scholarship-price my-2">${s.amount}</p>
            <p class="scholarship-deadline my-2">${deadlineStr}</p>
            <div class="mt-3">
                <a href="${s.applyURL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary w-100 py-2" style="border-radius:6px; padding: 6px 12px; font-size:0.9rem;">View & Apply</a>
            </div>
        </div>
    `;
}

function renderResults(eligible, border, cgpa) {
    const container = document.getElementById('results-container');
    container.innerHTML = "";

    if (eligible.length === 0 && border.length === 0) {
        container.innerHTML = `
            <div class="error-box">
                <h4 class="mb-2">No Matches Found</h4>
                <p class="mb-0">Unfortunately, we couldn't find any scholarships matching your profile. Consider checking again next semester as new opportunities are added frequently!</p>
            </div>
        `;
        return;
    }

    const wrapper = document.createElement("div");

    if (eligible.length > 0) {
        wrapper.innerHTML += `
            <div class="result-box mb-4">
                <h4 class="mb-0" style="color:var(--primary-blue);">You qualify for ${eligible.length} scholarship${eligible.length > 1 ? 's' : ''}!</h4>
            </div>
            <div class="row">
                ${eligible.map(s => `<div class="col-md-6">${renderScholarshipCard(s)}</div>`).join('')}
            </div>
        `;
    } else {
        wrapper.innerHTML += `
            <div class="result-box mb-4">
                <h4 class="mb-0" style="color:var(--primary-blue);">You do not fully qualify for any scholarships currently.</h4>
            </div>
        `;
    }

    if (border.length > 0) {
        wrapper.innerHTML += `
            <div class="warning-box mt-4 mb-4">
                <h4 class="mb-1" style="color:var(--warning-orange);">Almost There — You're Close to Qualifying</h4>
                <p class="mb-0 text-secondary" style="font-size:0.9rem;">Your CGPA of ${cgpa.toFixed(2)} is within 0.3 points of the minimum requirement for these.</p>
            </div>
            <div class="row">
                ${border.map(s => `<div class="col-md-6" style="opacity:0.85">${renderScholarshipCard(s)}</div>`).join('')}
            </div>
        `;
    }

    container.appendChild(wrapper);
}

