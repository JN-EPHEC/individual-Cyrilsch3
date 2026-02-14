const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        userList.innerHTML = '';

       users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span>${user.prenom} ${user.nom}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">X</button>`;
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