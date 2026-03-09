// ============================================
// FILE: assets/js/index.js
// PURPOSE: Logic for index.html to display featured scholarships
// DEPENDS ON: scholarships-data.js
// ============================================

function getDaysRemaining(deadlineStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineStr);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diff;
}

window.onload = function () {
    // Sort by deadline and pick first 3
    const sortedScholarships = [...scholarships].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const featuredList = sortedScholarships.slice(0, 3);
    const container = document.getElementById("featured-scholarships-container");
    container.innerHTML = "";

    featuredList.forEach(item => {
        const daysObj = getDaysRemaining(item.deadline);
        let deadlineStr = `Closes ${new Date(item.deadline).toLocaleDateString('en-GB')} (${daysObj > 0 ? daysObj + " days left" : "Ended"})`;

        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="card-custom">
                <span class="badge-type badge-${item.type}">${item.type.replace('-', ' ').toUpperCase()}</span>
                <h3>${item.name}</h3>
                <p class="mb-1"><strong>Funder:</strong> ${item.funder}</p>
                <p class="scholarship-price">${item.amount}</p>
                <div class="scholarship-deadline">${deadlineStr}</div>
                <a href="${item.applyURL}" target="_blank" class="btn btn-outline-primary w-100">Apply Now &rarr;</a>
            </div>
        `;
        container.appendChild(col);
    });
};
