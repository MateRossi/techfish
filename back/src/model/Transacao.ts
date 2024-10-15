import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./User";

class Transacao extends Model {
    public id!: number;
    public tipo!: string;
    public valor!: number;
    public descricao!: string;

    public userId!: number;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
}

Transacao.init(
    {
        tipo: {
            type: DataTypes.ENUM('DESPESA', 'RECEITA'),
            allowNull: false,
        },
        valor: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transacao',
        tableName: 'transacao'
    }
);

export default Transacao;