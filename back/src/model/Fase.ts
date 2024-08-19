import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./User";

class Fase extends Model {
    public id!: number;
    public nome!: string;
    public instrucoes!: string;
    
    //identifica a ordem da fase de produção: 0 - primeira fase, 1 - segunda fase e assim por diante.
    public ordem!: number;

    public userId!: number;

    static associate(models: any) {
        this.hasMany(models.HistoricoFasesProducao, { foreignKey: 'faseId' })
        this.belongsTo(models.User, { foreignKey: 'userId' })
    }
};

Fase.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        instrucoes: {
            type: DataTypes.STRING,
        },
        ordem: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Fase',
        tableName: 'fase',
    },
);

export default Fase;