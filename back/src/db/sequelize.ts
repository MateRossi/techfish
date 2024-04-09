import { Sequelize } from 'sequelize';
import pg from 'pg';

const { POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;

if (!POSTGRES_DATABASE || !POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_HOST || !POSTGRES_PORT) {
    throw new Error("Missing required environment variables for database connection.");
}

console.log("teste", POSTGRES_DATABASE);

export const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT), // Ensure to parse the port as an integer
    dialect: 'postgres',
    dialectModule: pg,
    timezone:  '-03:00',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Neste exemplo, estamos desabilitando a verificação do certificado, você pode ajustar conforme necessário
        }
    },
});