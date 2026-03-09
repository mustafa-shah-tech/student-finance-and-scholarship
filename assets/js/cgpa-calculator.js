// ============================================
// FILE: assets/js/cgpa-calculator.js
// PURPOSE: Logic for cgpa-calculator.html to calculate GPA and plan targets
// DEPENDS ON: none
// ============================================

const gradeMapping = {
    "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D": 1.0, "F": 0.0
};

let rowCount = 0;

function addRow() {
    if (rowCount >= 30) return alert("Maximum 30 courses allowed.");

    const list = document.getElementById('course-list');
    const row = document.createElement('div');
    row.className = "row course-row align-items-center g-2";
    row.id = `row-${rowCount}`;

    let gradeOptions = `<option value="" disabled selected>Select</option>`;
    for (let g in gradeMapping) {
        gradeOptions += `<option value="${gradeMapping[g]}">${g}</option>`;
    }

    row.innerHTML = `
        <div class="col-12 col-md-5">
            <input type="text" class="form-control" placeholder="Course Name (Optional)">
        </div>
        <div class="col-6 col-md-3">
            <input type="number" class="form-control cr-input" placeholder="Credit Hrs" min="0" step="1" required>
        </div>
        <div class="col-4 col-md-3">
            <select class="form-select gd-input" required>
                ${gradeOptions}
            </select>
        </div>
        <div class="col-2 col-md-1 text-center">
            <button class="btn btn-outline-danger btn-sm w-100" onclick="removeRow(${rowCount})">&times;</button>
        </div>
    `;
    list.appendChild(row);
    rowCount++;
}

function removeRow(id) {
    const row = document.getElementById(`row-${id}`);
    if (row) row.remove();
}

function calculateGPA() {
    const crInputs = document.querySelectorAll('.cr-input');
    const gdInputs = document.querySelectorAll('.gd-input');

    let totalQP = 0;
    let totalCr = 0;

    for (let i = 0; i < crInputs.length; i++) {
        const cr = parseFloat(crInputs[i].value);
        const gd = parseFloat(gdInputs[i].value);

        if (!isNaN(cr) && !isNaN(gd)) {
            totalCr += cr;
            totalQP += (cr * gd);
        }
    }

    if (totalCr > 0) {
        const gpa = totalQP / totalCr;
        const perc = gpa * 25;
        let classification = "Fail";
        if (gpa >= 3.5) classification = "Distinction";
        else if (gpa >= 3.0) classification = "Merit";
        else if (gpa >= 2.0) classification = "Pass";

        document.getElementById('gpa-out').innerText = gpa.toFixed(2);
        document.getElementById('gpa-perc-out').innerText = perc.toFixed(2) + "%";
        const classOut = document.getElementById('gpa-class-out');
        classOut.innerText = classification;

        if (classification === 'Fail') classOut.style.color = 'var(--danger-red)';
        else if (classification === 'Distinction') classOut.style.color = 'var(--success-green)';
        else classOut.style.color = 'var(--primary-blue)';

        document.getElementById('gpa-result-container').style.display = "block";
    }
}

// Converter function
document.getElementById('conv-cgpa').addEventListener('input', function () {
    if (this.value) {
        document.getElementById('conv-perc').value = (parseFloat(this.value) * 25).toFixed(2);
    } else {
        document.getElementById('conv-perc').value = '';
    }
});
document.getElementById('conv-perc').addEventListener('input', function () {
    if (this.value) {
        document.getElementById('conv-cgpa').value = (parseFloat(this.value) / 25).toFixed(2);
    } else {
        document.getElementById('conv-cgpa').value = '';
    }
});

// Target Planner
function planTarget() {
    const currentCgpa = parseFloat(document.getElementById('t-curr-cgpa').value);
    const currentCr = parseFloat(document.getElementById('t-curr-cr').value);
    const targetCgpa = parseFloat(document.getElementById('t-target-cgpa').value);
    const remCr = parseFloat(document.getElementById('t-rem-cr').value);
    const resBox = document.getElementById('target-result');

    if (isNaN(currentCgpa) || isNaN(currentCr) || isNaN(targetCgpa) || isNaN(remCr)) return;

    const totalReqQP = targetCgpa * (currentCr + remCr);
    const currentQP = currentCgpa * currentCr;
    const requiredQP = totalReqQP - currentQP;
    const requiredCgpaList = requiredQP / remCr;

    if (requiredCgpaList > 4.0) {
        const maxPossible = ((currentQP + (4.0 * remCr)) / (currentCr + remCr)).toFixed(2);
        resBox.innerHTML = `<div class="p-2" style="background-color:#FDECEA; color:var(--danger-red); border-radius:8px;">This target cannot be reached with remaining credits. Consider aiming for ${maxPossible} maximum instead.</div>`;
    } else if (requiredCgpaList <= 0) {
        resBox.innerHTML = `<div class="p-2" style="background-color:#E6F4EA; color:var(--success-green); border-radius:8px;">You have already secured this target! You need less than 0 GPA in remaining courses to maintain this.</div>`;
    } else {
        resBox.innerHTML = `<div class="p-2" style="background-color:var(--accent-light-blue); color:var(--primary-blue); border-radius:8px;">You need an average of <strong>${requiredCgpaList.toFixed(2)} GPA</strong> in your remaining ${remCr} credit hours to reach your target.</div>`;
    }
}

// Add default rows
addRow(); addRow(); addRow(); addRow(); addRow();
