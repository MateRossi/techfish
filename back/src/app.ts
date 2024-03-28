import express from 'express';
import { sequelize } from './db/sequelize';
import router from './routes';
import cors from 'cors';
import corsOptions from './config/corsOptions';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

(async () => {
    try {
        await sequelize.sync();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados.', error);
    };
})();

app.listen(port, () => {
    console.log(`Servidor inicializado em http://localhost:${port}`);
});