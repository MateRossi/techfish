import './PropertyValue.css';

function PropertyValue({ value, type, icon, description }) {
    return (
        <div className="property-value-item">
            <div className="tooltip">
                <img
                    width="52px"
                    height="52px"
                    src={icon}
                    alt={`ícone de ${icon}`}
                />
                <p>
                    {
                        value === null || value === undefined ? '-' : <>{value}{type}</> 
                    }
                </p>
                <span className="tooltiptext">{description}</span>
            </div>
        </div>
    );
}

export default PropertyValue;
