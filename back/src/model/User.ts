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
        this.hasMany(models.Aparelho, { foreignKey: 'userId' })
        this.hasMany(models.Tanque, { foreignKey: 'userId' })
        this.hasMany(models.Especie, { foreignKey: 'userId' })
        this.hasMany(models.Producao, { foreignKey: 'userId' })
        this.hasMany(models.Fase, { foreignKey: 'userId' })
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