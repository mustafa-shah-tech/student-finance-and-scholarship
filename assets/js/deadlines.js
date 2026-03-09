// ============================================
// FILE: assets/js/deadlines.js
// PURPOSE: Logic for deadlines.html to display active and expired deadlines
// DEPENDS ON: scholarships-data.js
// ============================================

function getDaysRemaining(deadlineStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineStr);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diff;
}

function renderList(filter = 'all') {
    const activeContainer = document.getElementById('active-deadlines');
    const expiredContainer = document.getElementById('expired-container');

    activeContainer.innerHTML = '';
    expiredContainer.innerHTML = '';

    const activeList = [];
    const expiredList = [];

    scholarships.forEach(s => {
        // Filter check
        if (filter !== 'all') {
            if (filter === 'international' && !s.tags.includes('international')) return;
            if (filter === 'loan' && s.type !== 'loan') return;
            if (filter === 'merit' && !s.type.includes('merit') && !s.tags.includes('merit')) return;
            if (filter === 'need-based' && !s.type.includes('need')) return;
        }

        const days = getDaysRemaining(s.deadline);
        s.daysRemaining = days;

        if (days < 0) expiredList.push(s);
        else activeList.push(s);
    });

    activeList.sort((a, b) => a.daysRemaining - b.daysRemaining);
    expiredList.sort((a, b) => b.daysRemaining - a.daysRemaining); // Most recently expired first

    if (activeList.length === 0) {
        activeContainer.innerHTML = `<div class="p-4 text-center text-secondary border rounded bg-white">No upcoming deadlines found for this category.</div>`;
    } else {
        activeList.forEach(s => {
            let badgeClass = 'deadline-ok';
            if (s.daysRemaining < 7) badgeClass = 'deadline-urgent';
            else if (s.daysRemaining <= 30) badgeClass = 'deadline-soon';

            const row = `
                <div class="deadline-row">
                    <div class="deadline-info">
                        <div class="deadline-title">${s.name}</div>
                        <div class="deadline-funder">${s.funder}</div>
                        <div class="deadline-amount">${s.amount}</div>
                    </div>
                    <div class="deadline-timer">
                        <div class="text-end me-3">
                            <div class="fw-bold" style="color:var(--text-primary);">${new Date(s.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                            <a href="${s.applyURL}" target="_blank" class="text-decoration-none" style="font-size:0.85rem; color:var(--primary-blue);">Apply Info &rarr;</a>
                        </div>
                        <div class="days-badge ${badgeClass}">${s.daysRemaining} days left</div>
                    </div>
                </div>
            `;
            activeContainer.innerHTML += row;
        });
    }

    if (expiredList.length === 0) {
        expiredContainer.innerHTML = '<p class="text-secondary mb-0">No expired scholarships in this category.</p>';
    } else {
        expiredList.forEach(s => {
            const row = `
                <div class="deadline-row opacity-75">
                    <div class="deadline-info">
                        <div class="deadline-title" style="color:var(--text-secondary);">${s.name}</div>
                        <div class="deadline-funder">${s.funder}</div>
                    </div>
                    <div class="deadline-timer">
                        <div class="fw-bold me-3 text-secondary">${new Date(s.deadline).toLocaleDateString('en-GB')}</div>
                        <div class="days-badge deadline-expired">Closed</div>
                    </div>
                </div>
            `;
            expiredContainer.innerHTML += row;
        });
    }
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderList(this.dataset.filter);
    });
});

// Initialize
renderList();
