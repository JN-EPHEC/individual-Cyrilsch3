const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

// Charger les membres actifs
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        renderUsers(users, false);
    } catch (error) {
        console.error("Erreur chargement :", error);
    }
}

// Charger les archives
async function loadArchivedUsers() {
    try {
        const response = await fetch('/api/users/archived');
        const users = await response.json();
        renderUsers(users, true);
    } catch (error) {
        console.error("Erreur archives :", error);
    }
}

function renderUsers(users, isArchiveView) {
    userList.innerHTML = '';
    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'col-md-10 mb-3';
        div.innerHTML = `
            <div class="user-card ${isArchiveView ? 'opacity-50' : ''}">
                <div class="d-flex align-items-center">
                    <span class="badge border border-dark text-dark me-3" style="border-radius:0; font-size:0.7rem">${user.tag}</span>
                    <span class="user-name">${user.prenom} ${user.nom}</span>
                </div>
                <div>
                    ${isArchiveView 
                        ? `<button class="btn btn-sm btn-outline-dark" onclick="restoreUser(${user.id})">Restaurer</button>`
                        : `<button class="btn btn-sm btn-dark" onclick="archiveUser(${user.id})">Archiver</button>`
                    }
                </div>
            </div>
        `;
        userList.appendChild(div);
    });
}

// Formulaire d'ajout
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        tag: document.getElementById('tagSelect').value
    };

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        userForm.reset();
        loadUsers();
    } else {
        const err = await response.json();
        alert("Erreur : " + err.error);
    }
});

async function archiveUser(id) {
    await fetch(`/api/users/${id}/archive`, { method: 'PATCH' });
    loadUsers();
}

async function restoreUser(id) {
    await fetch(`/api/users/${id}/restore`, { method: 'PATCH' });
    loadArchivedUsers();
}

loadUsers();