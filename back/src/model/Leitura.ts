import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import Tanque from "./Tanque";
import Aparelho from "./Aparelho";

class Leitura extends Model {
    public id!: number;

    public aparelhoId!: string;
    public tanqueId!: number;

    public data_hora!: Date;
    public ph!: number;
    public temperatura!: number;
    public orp!: number;
    public tds!: number;
    public o2!: number;
    public o2_mg!: number;
    public turbidez!: number;

    static associate(models: any) {
        this.belongsTo(models.Aparelho, { foreignKey: 'aparelhoId', as: 'aparelho' })
        this.belongsTo(models.Tanque, { foreignKey: 'tanqueId', as: 'tanque' })
    }
};

Leitura.init(
    {
        data_hora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ph: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0,
                max: 14,
            },
        },
        temperatura: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0,
                max: 40,
            },
        },
        orp: {
            type: DataTypes.DOUBLE,
            validate: {
                min: -2000,
                max: 2000,
            },
        },
        tds: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0,
                max: 1500,
            },
        },
        o2: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0,
                max: 2000,
            },
        },
        o2_mg: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0,
                max: 20,
            },
        },
        turbidez: {
            type: DataTypes.DOUBLE,
            validate: {
                min: 0,
                max: 1000,
            },
        },
        aparelhoId: {
            type: DataTypes.STRING,
            references: {
                model: Aparelho,
                key: 'id',
            },
            allowNull: false,
        },
        tanqueId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tanque,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Leitura',
        tableName: 'leitura',
    },
);

export default Leitura;
