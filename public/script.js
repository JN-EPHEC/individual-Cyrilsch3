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
                <div class="user-card">
                    <div class="user-name">
                        ${user.prenom} ${user.nom}
                    </div>
                    <div class="delete-link" onclick="deleteUser(${user.id})">
                        Supprimer —
                    </div>
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
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
        });

        if (response.ok) {
            userForm.reset();
            loadUsers(); 
        }
    } catch (error) {
        console.error("Erreur ajout :", error);
    }
});

loadUsers();