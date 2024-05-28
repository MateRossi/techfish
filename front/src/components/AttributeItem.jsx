import './AttributeItem.css';

function AttributeItem({ attributeName, minValue, maxValue, lastValue }) {

    return (
        <div className='AttributeItem'>
            <h4>{attributeName.replace('_', '')}</h4>
            <div className='ItemInfo'>
                <span className='last-value'><p>Última:</p> <p>{lastValue}</p></span>
                <span><p>Mínimo:</p><p>{minValue}</p></span>
                <span><p>Máximo:</p><p>{maxValue}</p></span>
                <span><p>Ideal:</p><p>N/A</p></span>
            </div>
        </div>
    );
}

export default AttributeItem;