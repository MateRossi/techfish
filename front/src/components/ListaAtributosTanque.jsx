import './ListaAtributosTanque.css';

function ListaAtributosTanque({ tanque }) {
    return (
        <ul className="lista-atributos-tanque">
            <li>Área do tanque: <span>{tanque.areaTanque}m²</span></li>
            <li>Volume de água: <span>{tanque.volumeAgua}L</span></li>
            <li>Estimativa de peixes presentes no tanque: <span>{tanque.totalPeixes}</span></li>
        </ul>
    )
}

export default ListaAtributosTanque;