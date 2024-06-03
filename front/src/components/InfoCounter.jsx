import './InfoCounter.css';

function InfoCounter({ nomePropriedade, valor }) {
    return (
        <div className="info-counter">
            <div>{nomePropriedade}</div><span>{valor}</span>
        </div>
    )
}

export default InfoCounter;