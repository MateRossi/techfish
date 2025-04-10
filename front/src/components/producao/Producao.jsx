import './Producao.css';
import ProducaoPropItem from './ProducaoPropItem';

export default function Producao({ producao }) {
    console.log(producao);

    return (
        <div className="producao-item" key={producao.id}>
            <div className='producao-content'>
                <div className='title'>
                    <h2>Tanque {producao.producao.tanque.nome}</h2>
                    <p>Especie: {producao.producao.especie.nome}</p>
                </div>
                <div className='production-prop-items-container'>
                    <ProducaoPropItem title="TCA" value={producao.producao.tcaGeral || '-'} />
                    <ProducaoPropItem title="GPD" value={producao.producao.gpdGeral || '-'} valueType="cm" />
                    <ProducaoPropItem title="Massa atual" value={producao.producao.pesoIndividualFinal || producao.producao.pesoMedioIndividualInicial || '-'} valueType="g" />
                    <ProducaoPropItem title="Fase Atual" value={producao.fase.nome} />
                </div>
                <p className='prod-status'>{producao.producao.status}</p>
            </div>
            <hr className='producao-separator' />
            <div className='producao-item-footer'>
                <div>
                    <h2>Producao #{producao.id}</h2>
                    <p>Total de ração fornecida: {producao.producao.totalRacaoFornecida || "-"}</p>
                </div>
                <button className='production-item-button'>Cadastrar Tratamento</button>
            </div>
        </div>

    )
}