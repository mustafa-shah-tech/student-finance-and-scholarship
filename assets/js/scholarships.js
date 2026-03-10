// ============================================
// FILE: assets/js/scholarships.js
// PURPOSE: Logic for scholarships.html to filter and list scholarships
// DEPENDS ON: scholarships-data.js
// ============================================

function getDaysRemaining(deadlineStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineStr);
    return Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
}

const grid = document.getElementById('scholarships-grid');
const inputSearch = document.getElementById('f-search');
const inputDegree = document.getElementById('f-degree');
const inputType = document.getElementById('f-type');
const inputLocation = document.getElementById('f-location');

function renderGrid() {
    grid.innerHTML = "";
    let count = 0;

    const q = inputSearch.value.toLowerCase();
    const d = inputDegree.value;
    const t = inputType.value;
    const l = inputLocation.value;

    scholarships.forEach(s => {
        const matchQ = s.name.toLowerCase().includes(q) || s.funder.toLowerCase().includes(q);
        const matchD = d === 'all' || s.degreeLevel.includes(d);
        const matchT = t === 'all' || s.type.includes(t);
        const matchL = l === 'all' || s.province === 'all' || s.province === l;

        if (matchQ && matchD && matchT && matchL) {
            count++;
            const days = getDaysRemaining(s.deadline);
            let dlStr = new Date(s.deadline).toLocaleDateString('en-GB');
            if (days >= 0) {
                dlStr += ` (${days} days left)`;
            } else dlStr += ` (Closed)`;

            grid.innerHTML += `
                <div class="col-md-6 mb-4">
                    <div class="card-custom">
                        <div>
                            <span class="badge-type badge-${s.type}">${s.type.replace('-', ' ')}</span>
                            <h4 class="mb-2" style="font-size: 1.25rem; color:var(--primary-blue);">${s.name}</h4>
                            <p class="text-secondary mb-1"><strong>Funder:</strong> ${s.funder}</p>
                            <p class="scholarship-price my-3">${s.amount}</p>
                            <p class="scholarship-deadline mb-4"><span style="color:var(--text-secondary);">Deadline:</span> <span style="font-family:var(--font-mono);">${dlStr}</span></p>
                        </div>
                        <div class="mt-auto">
                            <a href="${s.applyURL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary w-100">Details & Apply</a>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    if (count === 0) {
        grid.innerHTML = `
            <div class="col-12 py-5 text-center">
                <div class="p-4" style="background-color: white; border: 1px solid var(--border-color); border-radius: 12px;">
                    <h4 class="text-secondary">No scholarships found matching criteria.</h4>
                    <button class="btn btn-primary mt-3" onclick="document.getElementById('reset-filters').click();">Reset Filters</button>
                </div>
            </div>
        `;
    }
}

[inputSearch, inputDegree, inputType, inputLocation].forEach(el => el.addEventListener('input', renderGrid));

document.getElementById('reset-filters').addEventListener('click', () => {
    inputSearch.value = "";
    inputDegree.value = "all";
    inputType.value = "all";
    inputLocation.value = "all";
    renderGrid();
});

// initial draw
renderGrid();

