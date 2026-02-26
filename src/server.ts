import express from 'express';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import { requestLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js'; 

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(requestLogger);

app.use('/api', userRoutes);

app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => console.log("Serveur prêt sur http://localhost:3000"));
});