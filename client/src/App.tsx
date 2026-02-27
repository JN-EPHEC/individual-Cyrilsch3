import { useEffect, useState } from 'react'
import './App.css'

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  return (
    <>
      <h1>Mon TP Dev 3</h1>
      
      <div className="card">
        <h2>Liste des utilisateurs</h2>
        {}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ margin: '10px 0', fontSize: '1.2rem' }}>
              👤 {user.name}
            </li>
          ))}
        </ul>

        {users.length === 0 && <p>Aucun utilisateur trouvé ou serveur éteint.</p>}
      </div>

      <p className="read-the-docs">
        Connecté au backend sur le port 3000
      </p>
    </>
  )
}

export default App