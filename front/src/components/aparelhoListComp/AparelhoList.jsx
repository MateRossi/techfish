import './AparelhoList.css';

function AparelhoList({ icon, aparelhos, setAparelhos, setAparelhosParaRemover, setAparelhosDisponiveis, setIsModified }) {
    const handleRemove = (aparelho) => {
        // Adiciona o aparelho à lista de aparelhos para remover, se ainda não estiver nela
        setAparelhosParaRemover(prev => {
            if (!prev.some(a => a.id === aparelho.id)) {
                return [...prev, aparelho];
            }
            return prev;
        });

        setAparelhos(prev => prev.filter(a => a.id !== aparelho.id));

        setAparelhosDisponiveis(prev => {
            if (!prev.some(a => a.id === aparelho.id)) {
                return [...prev, aparelho];
            }
            return prev;
        });

        setIsModified(true);
    };

    return (
        <div className='tank-modal-aparelhos-container'>
            {aparelhos?.length > 0 ? aparelhos.map((aparelho) => (
                <div className='aparelhos-list-item' key={aparelho.id}>Aparelho: {aparelho.id} <button onClick={() => handleRemove(aparelho)}>{icon}</button></div>
            )) : 'Nenhum aparelho monitorando este tanque.'}
        </div>
    )
}

export default AparelhoList;