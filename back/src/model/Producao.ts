import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../db/sequelize';
import Tanque from './Tanque';
import Especie from './Especie';

class Producao extends Model {
    public id!: number;
    
    public tanqueId!: number;
    public especieId!: number;

    static associate(models: any) {
        this.belongsTo(models.Tanque, { foreignKey: 'tanqueId' })
        this.belongsTo(models.Especie, { foreignKey: 'especieId' })
    };
};

Producao.init(
    {
        tanqueId: {
            type:DataTypes.INTEGER,
            references: {
                model: Tanque,
                key: 'id'
            },
        },
        especieId: {
            type: DataTypes.INTEGER,
            references: {
                model: Especie,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Producao',
        tableName: 'producao'
    }
);

export default Producao;