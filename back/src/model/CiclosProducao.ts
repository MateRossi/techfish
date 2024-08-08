import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize';
import Ciclo from './Ciclo';
import Producao from './Producao';

class CiclosProducao extends Model {
    public cicloId!: number;
    public producaoId!: number;
};

CiclosProducao.init(
    {
        cicloId: {
            type: DataTypes.INTEGER,
            references: {
                model: Ciclo,
                key: 'id',
            },
        },
        producaoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Producao,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'CiclosProducao',
        tableName: 'ciclos_producao'
    },
);

export default CiclosProducao;