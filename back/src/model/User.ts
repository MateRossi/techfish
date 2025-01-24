import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class User extends Model {
    public id!: number;
    
    public nome!: string;
    public email!: string;
    public senha!: string;


    public role!: string;
    public refreshToken!: string;

    static associate(models: any) {
        this.hasMany(models.Aparelho, { foreignKey: 'userId', as: 'aparelhos' })
        this.hasMany(models.Tanque, { foreignKey: 'userId', as: 'tanques' })
        this.hasMany(models.Especie, { foreignKey: 'userId', as: 'especies' })
        this.hasMany(models.Producao, { foreignKey: 'userId', as: 'producoes' })
        this.hasMany(models.FasesProducao, { foreignKey: 'userId', as: 'fasesProducao' })
    }
};

User.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'cliente',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user'
    },
);

export default User;