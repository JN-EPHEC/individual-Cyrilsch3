import express from 'express';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import { requestLogger } from './middlewares/logger.js'; // Import du nouveau middleware

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(express.static('public'));

// ACTIVATION DU LOGGER (doit être avant app.use('/api', ...))
app.use(requestLogger); 

app.use('/api', userRoutes);

sequelize.sync({ force: false }) // On reste sur false pour garder tes données
    .then(() => {
        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    });