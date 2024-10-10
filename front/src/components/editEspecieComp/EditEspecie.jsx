import './EditEspecie.css';
import especiesImg from '../../img/especiesIcon.svg';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/use-axios-private';
import useAuth from '../../hooks/use-auth';

export default function EditEspecie({ especie, setEspecies, setShowModal }) {
    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [nomeEspecie, setNomeEspecie] = useState(especie?.nome);
    const [phIdeal, setPhIdeal] = useState(especie?.phIdeal);
    const [temperaturaIdeal, setTemperaturaIdeal] = useState(especie?.temperaturaIdeal);
    const [orpIdeal, setOrpIdeal] = useState(especie?.orpIdeal);
    const [tdsIdeal, setTdsIdeal] = useState(especie?.tdsIdeal);
    const [o2Ideal, setO2Ideal] = useState(especie?.o2Ideal);
    const [o2MgIdeal, setO2MgIdeal] = useState(especie?.o2_mgIdeal);
    const [turbidezIdeal, setTurbidezIdeal] = useState(especie?.turbidezIdeal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novaEspecie = {
            nome: nomeEspecie,
            phIdeal: parseFloat(phIdeal),
            temperaturaIdeal: parseFloat(temperaturaIdeal),
            orpIdeal: parseFloat(orpIdeal),
            tdsIdeal: parseFloat(tdsIdeal),
            o2Ideal: parseFloat(o2Ideal),
            o2_mgIdeal: parseFloat(o2MgIdeal),
            turbidezIdeal: parseFloat(turbidezIdeal),
        }

        try {
            const response = await axiosPrivate.put(`/users/${auth?.id}/especies/${especie.id}`, novaEspecie);
            setEspecies(prevEspecies =>
                prevEspecies.map(e =>
                    e.id === especie.id ? response.data : e
                )
            );
            setShowModal(false);
        } catch (err) {
            console.error(err);
            setErrMsg('Erro ao editar espécie');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <img src={especiesImg} className='modal-icon' alt="ícone de três peixes" style={{ border: 'none' }} />
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <h2 className="modal-title">Editar Espécie</h2>
            <p>Edite informações relacionadas à espécie {nomeEspecie}.</p>
            <div className='InputContainer'>
                <label htmlFor="nomeEspecie">Nome da espécie*</label>
                <input
                    id='nomeEspecie'
                    type="text"
                    value={nomeEspecie}
                    onChange={(e) => setNomeEspecie(e.target.value)}
                    required
                />
            </div>
            <div className='line-container'>
                <div className='InputContainer'>
                    <label htmlFor="ph-ideal">Ph ideal: </label>
                    <input
                        id='ph-ideal'
                        type="number"
                        value={phIdeal}
                        onChange={(e) => setPhIdeal(e.target.value)}
                        min={0}
                        max={14}
                        step={.01}
                    />
                </div>
                <div className='InputContainer'>
                    <label htmlFor="temperatura-ideal">Temperatura Ideal (°C)</label>
                    <input
                        id='temperatura-ideal'
                        type="number"
                        value={temperaturaIdeal}
                        onChange={(e) => setTemperaturaIdeal(e.target.value)}
                        min={5}
                        max={40}
                        step={.01}
                    />
                </div>
            </div>
            <div className='line-container'>
                <div className='InputContainer'>
                    <label htmlFor="orp-ideal">ORP ideal (mV): </label>
                    <input
                        id='orp-ideal'
                        type="number"
                        value={orpIdeal}
                        onChange={(e) => setOrpIdeal(e.target.value)}
                        min={-400}
                        max={400}
                        step={.01}
                    />
                </div>
                <div className='InputContainer'>
                    <label htmlFor="tds-ideal">TDS ideal (mg/L)</label>
                    <input
                        id='tds-ideal'
                        type="number"
                        value={tdsIdeal}
                        onChange={(e) => setTdsIdeal(e.target.value)}
                        min={0}
                        max={300}
                        step={.01}
                    />
                </div>
            </div>
            <div className='line-container'>
                <div className='InputContainer'>
                    <label htmlFor="o2-ideal">O₂ Ideal(%): </label>
                    <input
                        id='o2-ideal'
                        type="number"
                        value={o2Ideal}
                        onChange={(e) => setO2Ideal(e.target.value)}
                        min={0}
                        max={100}
                        step={.01}
                    />
                </div>
                <div className='InputContainer'>
                    <label htmlFor="o2mg-ideal">O₂mg Ideal(mg/L)</label>
                    <input
                        id='o2mg-ideal'
                        type="number"
                        value={o2MgIdeal}
                        onChange={(e) => setO2MgIdeal(e.target.value)}
                        min={0}
                        max={20}
                        step={.01}
                    />
                </div>
            </div>
            <div className='line-container'>
                <div className='InputContainer'>
                    <label htmlFor="turbidez-ideal">Turbidez ideal (NTU): </label>
                    <input
                        id='turbidez-ideal'
                        type="number"
                        value={turbidezIdeal}
                        onChange={(e) => setTurbidezIdeal(e.target.value)}
                        min={1}
                        max={150}
                        step={.01}
                    />
                </div>
            </div>
            <button type='submit' className='modal-confirm-button'>Confirmar</button>
        </form>
    )
}