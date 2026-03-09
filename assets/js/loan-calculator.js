// ============================================
// FILE: assets/js/loan-calculator.js
// PURPOSE: Logic for loan-calculator.html to calculate EMI
// DEPENDS ON: none
// ============================================

const formatCurrency = (num) => {
    return Math.round(num).toLocaleString('en-PK');
};

const presetSelect = document.getElementById('loan-preset');
const amountNumInput = document.getElementById('loan-amount-num');
const amountSlider = document.getElementById('loan-amount-slider');
const interestInput = document.getElementById('interest-rate');
const tenureSlider = document.getElementById('tenure-slider');
const tenureDisplay = document.getElementById('tenure-display');

// Outputs
const monthlyEmiDisplay = document.getElementById('monthly-emi');
const totalPrincipalDisplay = document.getElementById('total-principal');
const totalInterestDisplay = document.getElementById('total-interest');
const totalPaymentDisplay = document.getElementById('total-payment');
const barPrincipal = document.getElementById('bar-principal');
const barInterest = document.getElementById('bar-interest');
const percPrincipal = document.getElementById('perc-principal');
const percInterest = document.getElementById('perc-interest');

function calculateEMI() {
    let P = parseFloat(amountNumInput.value) || 0;
    let annualRate = parseFloat(interestInput.value) || 0;
    let years = parseInt(tenureSlider.value) || 0;

    if (P < 0) P = 0; if (annualRate < 0) annualRate = 0;

    tenureDisplay.innerText = years + (years === 1 ? " Year" : " Years");

    let r = annualRate / 12 / 100;
    let n = years * 12;

    let emi = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (r === 0) {
        emi = P / n;
        totalPayment = P;
        totalInterest = 0;
    } else if (P > 0 && n > 0) {
        emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        totalPayment = emi * n;
        totalInterest = totalPayment - P;
    }

    if (!isFinite(emi)) emi = 0;

    monthlyEmiDisplay.innerText = formatCurrency(emi);
    totalPrincipalDisplay.innerText = formatCurrency(P);
    totalInterestDisplay.innerText = formatCurrency(totalInterest);
    totalPaymentDisplay.innerText = formatCurrency(totalPayment);

    let ptBase = totalPayment > 0 ? totalPayment : 1;
    let pp = (P / ptBase) * 100;
    let pi = (totalInterest / ptBase) * 100;

    barPrincipal.style.width = pp + "%";
    barInterest.style.width = pi + "%";
    percPrincipal.innerText = Math.round(pp);
    percInterest.innerText = Math.round(pi);
}

// Event Listeners
amountSlider.addEventListener('input', (e) => { amountNumInput.value = e.target.value; calculateEMI(); });
amountNumInput.addEventListener('input', (e) => { amountSlider.value = e.target.value; calculateEMI(); });
interestInput.addEventListener('input', () => { presetSelect.value = "custom"; calculateEMI(); });
tenureSlider.addEventListener('input', calculateEMI);

presetSelect.addEventListener('change', (e) => {
    if (e.target.value !== "custom") {
        interestInput.value = e.target.value;
    }
    calculateEMI();
});

// Initialize
calculateEMI();
