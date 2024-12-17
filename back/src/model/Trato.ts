import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Producao from "./Producao";

class Trato extends Model {
    public id!: number;

    public producaoId!: number;
    public quilosRacao!: number;
    public precoQuilo!: number;
    public pesoMedioIndividualAtual!: number;

    static associate(models: any) {
        this.belongsTo(models.Producao, { foreignKey: 'producaoId', as: 'producao' })
    };
};

Trato.init(
    {
        producaoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Producao,
                key: 'id'
            },
            allowNull: false,
        },
        quilosRacao: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        precoQuilo: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        pesoMedioIndividualAtual: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
    },
    {
        sequelize,
        modelName: 'Trato',
        tableName: 'trato'
    }
);

export default Trato;