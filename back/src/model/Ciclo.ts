import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class Ciclo extends Model {
    public id!: number;
    public nome!: string;
    public instrucoes!: string;
    public dataInicio!: Date;
    public dataFim!: Date;
    public tipoRacao!: string;
    public alimentacaoDiariaKg!: number;
    public precoKgRacao!: number;

    static associate(models: any) {
        this.belongsToMany(models.Producao, { through: models.CiclosProducao, foreignKey: 'producaoId' })    
    };
};

Ciclo.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        instrucoes: {
            type: DataTypes.STRING,
        },
        dataInicio: {
            type: DataTypes.DATE,
        },
        dataFim: {
            type: DataTypes.DATE,
        },
        tipoRacao: {
            type: DataTypes.STRING,
        },
        alimentacaoDiariaKg: {
            type: DataTypes.DECIMAL,
        },
        precoKgRacao: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        sequelize,
        modelName: 'Ciclo',
        tableName: 'ciclo',
    },
);

export default Ciclo;