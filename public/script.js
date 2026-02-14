const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        userList.innerHTML = '';

       users.forEach(user => {
    const li = document.createElement('li');
    // Dans la boucle forEach de loadUsers() :
        li.className = 'list-group-item d-flex justify-content-between align-items-center p-3 transition-all';
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                    ${user.prenom[0]}${user.nom[0]}
                </div>
                <div>
                    <h6 class="mb-0">${user.prenom} ${user.nom}</h6>
                    <small class="text-muted">ID: #${user.id}</small>
                </div>
            </div>
            <button class="btn btn-outline-danger btn-sm rounded-pill px-3" onclick="deleteUser(${user.id})">
                Supprimer
            </button>
        `;
    userList.appendChild(li);       
});
        
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

async function deleteUser(id) {
    //if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadUsers();
        } else {
            alert("Erreur lors de la suppression");
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom, prenom })
        });

        if (response.ok) {
            userForm.reset();
            loadUsers(); 
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
    }
});

loadUsers();