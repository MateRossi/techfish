import { Model, DataTypes } from "sequelize";
import { sequelize } from '../db/sequelize';
import Fase from "./Fase";
import Producao from "./Producao";
import User from "./User";

class FasesProducao extends Model {
    public id!: number;
    public dataInicio!: Date;
    public dataFim!: Date;

    public userId!: number;
    public faseId!: number;
    public producaoId!: number;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        this.belongsTo(models.Fase, { foreignKey: 'faseId', as: 'fase' })
        this.belongsTo(models.Producao, { foreignKey: 'producaoId', as: 'producao' })
    };
};

FasesProducao.init(
    {
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dataFim: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        faseId: {
            type: DataTypes.INTEGER,
            references: {
                model: Fase,
                key: 'id'
            },
            allowNull: false,
        },
        producaoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Producao,
                key: 'id'
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'FasesProducao',
        tableName: 'fases_producao'
    },
);

export default FasesProducao;