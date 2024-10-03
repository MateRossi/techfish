import './EspecieCard.css';

export default function EspecieCard({ especie }) {
    return (
        <ul className='especie-details'>
            <li>pH {especie.phIdeal}</li>
            <li>Oxidação {especie.orpIdeal}</li>
            <li>Turbidez {especie.turbidezIdeal}</li>
            <li>Temperatura {especie.temperaturaIdeal}</li>
            <li>Oxigenação {especie.o2Ideal}</li>
            <li>Oxigenação mg {especie.o2_mgIdeal}</li>
            <li>Sólidos dissolvidos {especie.tdsIdeal}</li>
        </ul>
    );
}