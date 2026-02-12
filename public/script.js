const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

// 1. Fonction pour récupérer et afficher les utilisateurs
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        // On vide la liste actuelle
        userList.innerHTML = '';

        // 2. Ajout d'un <li> pour chaque utilisateur
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${user.prenom} ${user.nom}
                <span class="badge bg-secondary rounded-pill">ID: ${user.id}</span>
            `;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    }
}

// 3. Intercepter la soumission du formulaire
userForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

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
            // 4. Si l'ajout réussit, on vide le formulaire et on rafraîchit la liste
            userForm.reset();
            loadUsers(); 
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
    }
});

// Chargement initial au démarrage
loadUsers();