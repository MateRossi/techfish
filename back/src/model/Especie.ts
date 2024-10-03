import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./User";

class Especie extends Model {
    public id!: number;
    public nome!: string;

    public phIdeal!: number;
    public temperaturaIdeal!: number;
    public orpIdeal!: number;
    public tdsIdeal!: number;
    public o2Ideal!: number;
    public o2_mgIdeal!: number;
    public turbidezIdeal!: number;
    public imgUrl!: string;

    public userId!: number;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    };
}

Especie.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phIdeal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 14,
            },
        },
        temperaturaIdeal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 5,
                max: 40,
            },
        },
        orpIdeal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: -400,
                max: 400,
            },
        },
        tdsIdeal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 300,
            },
        },
        o2Ideal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 100,
            },
        },
        o2_mgIdeal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 0,
                max: 20,
            },
        },
        turbidezIdeal: {
            type: DataTypes.DECIMAL,
            validate: {
                min: 1,
                max: 150,
            },
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: 'Especie',
        tableName: 'especie',
    },
);

export default Especie;