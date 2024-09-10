import './SeletorAtributo.css';

function SeletorAtributo({ setAtributosLeitura, atributosLeitura }) {
    const toggleAtributo = (atributo) => {
        if (atributosLeitura.includes(atributo)) {
            setAtributosLeitura(atributosLeitura.filter(item => item !== atributo));
        } else {
            setAtributosLeitura([...atributosLeitura, atributo]);
        }
    };

    const isSelected = (atributo) => atributosLeitura.includes(atributo);

    return (
        <section className="seletores-atributo">
            <button className={isSelected('ph') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('ph')}>PH</button>
            <button className={isSelected('temperatura') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('temperatura')}>Temperatura</button>
            <button className={isSelected('orp') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('orp')}>ORP</button>
            <button className={isSelected('tds') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('tds')}>TDS</button>
            <button className={isSelected('o2') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('o2')}>O&#8322;</button>
            <button className={isSelected('o2_mg') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('o2_mg')}>O&#8322; mg</button>
            <button className={isSelected('turbidez') ? 'atributo-selected' : ''} onClick={() => toggleAtributo('turbidez')}>Turbidez</button>
        </section>
    )
}

export default SeletorAtributo;