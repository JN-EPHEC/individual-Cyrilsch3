import express from 'express';
import sequelize from './config/database.js';
import User from './models/User.js'; // Importation du modèle pour qu'il soit synchronisé

const app = express();
const port: number = 3000;
app.use(express.json());
sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Base de données synchronisée.');
        
        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Erreur lors de la synchronisation de la DB :', error);
    });

app.get('/', (req, res) => {
    res.send("Serveur avec Sequelize synchronisé !");
});