const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        userList.innerHTML = '';

        users.forEach(user => {
            const div = document.createElement('div');
            div.className = 'col-md-10';
            
            div.innerHTML = `
               <div class="d-flex align-items-center">
        <span class="badge border border-dark text-dark me-3" style="font-size: 0.6rem; border-radius: 0;">
            ${user.tag}
        </span>
        <span class="user-name">${user.prenom} ${user.nom}</span>
    </div>
    <div>
        <button class="btn btn-sm btn-outline-dark" onclick="changeTag(${user.id})">TAG</button>
        <button class="btn btn-sm btn-dark" onclick="archiveUser(${user.id})">ARCHIVER</button>
    </div>
`;
            userList.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur chargement :", error);
    }
}

async function deleteUser(id) {
    //if (!confirm("SUPPRIMER CE MEMBRE ?")) return;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadUsers();
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const tag = document.getElementById('tagSelect').value; 

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, tag })
    });

    if (response.ok) {
        userForm.reset();
        loadUsers(); 
    } else {
        const errorData = await response.json();
        alert("Erreur : " + errorData.error); 
    }
});

async function archiveUser(id) {
    await fetch(`/api/users/${id}/archive`, { method: 'PATCH' });
    loadUsers();
}

async function changeTag(id) {
    const newTag = prompt("Nouveau Tag (MEMBRE, ADMIN, VIP, INVITÉ) :");
    if (newTag) {
        const response = await fetch(`/api/users/${id}/tag`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: newTag })
        });
        if (!response.ok) alert("Tag invalide !");
        loadUsers();
    }
}
async function loadArchivedUsers() {
    try {
        const response = await fetch('/api/users/archived');
        const users = await response.json();

        userList.innerHTML = ''; // Vide la liste actuelle

        users.forEach(user => {
            const div = document.createElement('div');
            div.className = 'col-md-10';
            div.innerHTML = `
                <div class="user-card" style="opacity: 0.6;">
                    <div class="user-name">${user.prenom} ${user.nom} (Archivé)</div>
                    <div class="delete-link" onclick="restoreUser(${user.id})">Restaurer +</div>
                </div>
            `;
            userList.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur archives :", error);
    }
}
async function restoreUser(id) {
    try {
        const response = await fetch(`/api/users/${id}/restore`, {
            method: 'PATCH'
        });

        if (response.ok) {
            // On rafraîchit la vue des archives pour confirmer le départ de l'élément
            loadArchivedUsers(); 
            console.log("Membre restauré");
        } else {
            alert("Erreur lors de la restauration");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}

loadUsers();