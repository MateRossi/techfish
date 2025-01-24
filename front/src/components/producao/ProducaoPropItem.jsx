import './ProducaoPropItem.css';

export default function ProducaoPropItem ({ title, value, valueType }) {
    return (
        <div className="producao-prop-item">
            <h3>{title}</h3>
            <p>{value}{value !== '-' ? valueType : null}</p>
        </div>
    );
}