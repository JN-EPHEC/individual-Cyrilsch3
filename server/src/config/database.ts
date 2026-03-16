import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// On utilise la variable d'environnement DATABASE_URL que tu as créée précédemment
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Indispensable pour la connexion sécurisée à Supabase
    }
  }
});

export default sequelize;