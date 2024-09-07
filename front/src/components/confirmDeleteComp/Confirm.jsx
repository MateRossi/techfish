function Confirm({ icon, title, onConfirm }) {    
    return (
        <div>
            {icon}
            <h2 className="modal-title">Tem certeza?</h2>
            <p>{title}</p>
            <button type="submit" className="modal-confirm-button" onClick={onConfirm}>Confirmar</button>
        </div>
    );
}

export default Confirm;