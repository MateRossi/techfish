import { useEffect, useState } from "react";
import useAuth from "../../hooks/use-auth";
import useAxiosPrivate from "../../hooks/use-axios-private";
import aparelhoIcon from '../../img/tanque.png';
import Carregando from "../Carregando";
import Dropdown from '../../components/dropdownComp/Dropdown';
import './EditAparelho.css';

function EditAparelho({ aparelho, handleEdit, setShowModal }) {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);

    const [isModified, setIsModified] = useState(false);
    const [tanqueSelecionado, setTanqueSelecionado] = useState(aparelho?.tanque);
    const [tanques, setTanques] = useState([]);
    const [removeAparelho, setRemoveAparelho] = useState(aparelho?.tanque ? false : true);

    useEffect(() => {
        let isMounted = true;
        const getTanques = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth?.id}/tanques`);
                if (isMounted) {
                    setTanques(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao buscar Tanques')
            }
        }

        getTanques();

        return () => isMounted = false;
    }, [auth?.id, axiosPrivate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const aparelhoNoTanque = {
            id: aparelho.id,
            tanqueId: tanqueSelecionado?.id
        }

        handleEdit(e, aparelhoNoTanque);
        setShowModal(false);
    }

    const handleSelect = (tanque) => {
        setTanqueSelecionado(tanque);
        setRemoveAparelho(false);
        setIsModified(true);
    }

    if (loading) {
        return <Carregando />
    }

    const handleChange = () => {
        setRemoveAparelho(prev => !prev)
        !removeAparelho ? setIsModified(true) : setIsModified(false);  
    }

    return (
        <div>
            <img src={aparelhoIcon} className="modal-icon" alt="ícone de um aparelho de medição" />
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <form onSubmit={handleSubmit} id="aparelho-edit">
                <h2 className="modal-title">Editar Aparelho</h2>
                <p className="subtitulo-aparelho-edit">Mova este aparelho para um novo tanque ou o desabilite.</p>

                <div className="radio-input-container">
                    <input 
                        type="checkbox" 
                        checked={removeAparelho}
                        id="radio-button"
                        onChange={handleChange}
                    />
                    <label htmlFor="radio-button">Desabilitar aparelho</label>
                </div>

                <div className="InputContainer">
                    <label htmlFor="aparelho">Código do aparelho* </label>
                    <input
                        id="aparelho"
                        type="text"
                        value={aparelho.id}
                    />
                </div>

                <p className="tanques-select-label">Tanque</p>
                {
                    tanques?.length > 0
                        ? <div className="add-aparelho-container" style={{ padding: 0 }}>
                            <Dropdown options={tanques} value={tanqueSelecionado} onChange={handleSelect} label='nome' />
                        </div>
                        : 'Nenhum tanque disponível'
                }
                <button type="submit" className="modal-confirm-button" disabled={!isModified}>Salvar mudanças</button>
            </form>
        </div>
    )
}

export default EditAparelho;