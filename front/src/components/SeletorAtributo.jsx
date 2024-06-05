import './SeletorAtributo.css';

function SeletorAtributo({ setAtributoLeitura }) {
    return (
        <section className="seletores-atributo">
            <button onClick={() => setAtributoLeitura('ph')}>PH</button>
            <button onClick={() => setAtributoLeitura('temperatura')}>Temperatura</button>
            <button onClick={() => setAtributoLeitura('orp')}>ORP</button>
            <button onClick={() => setAtributoLeitura('tds')}>TDS</button>
            <button onClick={() => setAtributoLeitura('o2')}>O&#8322;</button>
            <button onClick={() => setAtributoLeitura('o2_mg')}>0&#8322; mg</button>
            <button onClick={() => setAtributoLeitura('turbidez')}>Turbidez</button>
        </section>
    )
}

export default SeletorAtributo;