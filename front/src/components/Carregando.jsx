import './Carregando.css';

function Carregando ({ height, width }) {
    return (
        <div className="loading-div" style={{ height:height|| '20px', width:width || '20px' }}></div>
    )
}

export default Carregando;