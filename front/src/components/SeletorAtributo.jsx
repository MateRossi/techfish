import './SeletorAtributo.css';

function SeletorAtributo({ setAtributosLeitura, atributosLeitura }) {
    const toggleAtributo = (atributo) => {
        if (atributosLeitura.includes(atributo)) {
            if (atributosLeitura.length === atributosLeitura.length) {
                setAtributosLeitura([atributo]);
            } else {
                setAtributosLeitura(atributosLeitura.filter(item => item !== atributo));
            }
        } else {
            setAtributosLeitura([...atributosLeitura, atributo]);
        }
    };

    const isSelected = (atributo) => atributosLeitura.includes(atributo);
    
    return (
        <section className="seletores-atributo">
            <button className={isSelected('ph') ? 'selected' : ''} onClick={() => toggleAtributo('ph')}>PH</button>
            <button className={isSelected('temperatura') ? 'selected' : ''} onClick={() => toggleAtributo('temperatura')}>Temperatura</button>
            <button className={isSelected('orp') ? 'selected' : ''} onClick={() => toggleAtributo('orp')}>ORP</button>
            <button className={isSelected('tds') ? 'selected' : ''} onClick={() => toggleAtributo('tds')}>TDS</button>
            <button className={isSelected('o2') ? 'selected' : ''} onClick={() => toggleAtributo('o2')}>O&#8322;</button>
            <button className={isSelected('o2_mg') ? 'selected' : ''} onClick={() => toggleAtributo('o2_mg')}>O&#8322; mg</button>
            <button className={isSelected('turbidez') ? 'selected' : ''} onClick={() => toggleAtributo('turbidez')}>Turbidez</button>
        </section>
    )
}

export default SeletorAtributo;