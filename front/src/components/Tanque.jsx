import { useNavigate } from "react-router-dom";
import TanqueHeader from "./TanqueHeader";
import DateShow from "./DateShow";
import Aparelho from "./Aparelho";
import './Tanque.css';
import useAuth from "../hooks/use-auth";

function Tanque({ tanqueId, nomeTanque, areaTanque, volumeAgua, totalPeixes, aparelhos }) {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/users/${auth.id}/tanques/${tanqueId}`);
    }

    return (
        <div className="TankItemContainer" onClick={handleClick} >
            <header className="tankItemHeader">
                <DateShow formatedDate={'31/05/2025 15:34'} />
                <TanqueHeader nomeTanque={nomeTanque} />
            </header>
            <section className="tank-item-info">
                <p>Area do tanque: {areaTanque || 'Não informado'}m²</p>
                <p>Volume de água: {volumeAgua || 'Não informado'}L</p>
                <p>Quantidade de peixes: {totalPeixes || 'Não informado'}</p>
                {aparelhos.map(aparelho => (
                    <Aparelho
                        key={aparelho.id_aparelho_es}
                        aparelhoId={aparelho.id_aparelho_es}
                        valoresAtuais={aparelho.Leituras}
                    />
                ))}
            </section>
        </div>
    )
}

export default Tanque;