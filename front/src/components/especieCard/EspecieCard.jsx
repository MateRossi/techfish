import './EspecieCard.css';

export default function EspecieCard({ especie }) {
    return (
        <ul className='especie-details'>
            <li><span>pH</span>{especie.phIdeal}</li><span></span>
            <li><span>Oxidação</span><span>{especie.orpIdeal}</span></li><span></span>
            <li><span>Turbidez</span><span>{especie.turbidezIdeal}</span></li><span></span>
            <li><span>Temperatura</span><span>{especie.temperaturaIdeal}</span></li><span></span>
            <li><span>Oxigenação</span><span>{especie.o2Ideal}</span></li><span></span>
            <li><span>Oxigenação mg</span> <span>{especie.o2_mgIdeal}</span></li><span></span>
            <li><span>Sólidos dissolvidos</span> <span>{especie.tdsIdeal}</span></li>
        </ul>
    );
}