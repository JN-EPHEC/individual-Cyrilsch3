import express from 'express';
import sequelize from './config/database.js';
import User from './models/User.js';
import userRoutes from './routes/userRoutes.js'; 


const app = express();
const port: number = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use('/api', userRoutes); 

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

// Cette route peut être supprimée car index.html prend le relais
app.get('/', (req, res) => {
    res.send("Serveur avec Sequelize synchronisé !");
});