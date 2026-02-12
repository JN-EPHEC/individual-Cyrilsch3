import express from 'express';
import type { Request, Response } from 'express';
const app = express();
const port: number = 3000;

// Route racine avec typage explicite (Défi relevé !)
app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API");
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});