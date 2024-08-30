import './PropertyValue.css';

function PropertyValue({ value, icon, description }) {
    return (
        <div className="property-value-item">
            <div className="tooltip">
                <img
                    width="32px"
                    height="32px"
                    src={icon}
                    alt={`ícone de ${icon}`}
                />
                <p>{value}</p>
                <span className="tooltiptext">{description}</span>
            </div>
        </div>
    );
}

export default PropertyValue;
