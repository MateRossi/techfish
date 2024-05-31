import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { sequelize } from './src/db/sequelize';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './src/config/corsOptions';
import credentials from './src/middleware/Credentials';
import auth from './src/routers/publicRoutes/AuthRouter';
import register from './src/routers/publicRoutes/RegisterRoute';
import refresh from './src/routers/publicRoutes/RefreshRouter';
import logout from './src/routers/publicRoutes/LogoutRouter';
import verifyJwt from './src/middleware/verifyJwt';
import router from './src/routes';
import * as associations from './src/model';

const app = express();
const port = process.env.PORT || 3000;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/auth', auth);
app.use('/register', register);
app.use('/refresh', refresh);
app.use('/logout', logout);

app.use(verifyJwt);

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