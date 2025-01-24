import { useEffect, useState } from 'react';
import producoesIcon from '../../img/especiesIcon.svg';
import Dropdown from '../dropdownComp/Dropdown';
import useAuth from '../../hooks/use-auth';
import useAxiosPrivate from '../../hooks/use-axios-private';
import Carregando from '../Carregando';
import { Link } from 'react-router-dom';
import './AddProducao.css';

export default function AddProducao({ setProducoes, setShowModal }) {
    const faseOptions = [
        { label: 'Alevinagem', value: 'Alevinagem' },
        { label: 'Recria', value: 'Recria' },
        { label: 'Engorda', value: 'Engorda' }
    ];
    
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(true);

    const [errMsg, setErrMsg] = useState('');

    //tanque
    const [tanque, setTanque] = useState({});
    const [tanqueOptions, setTanqueOptions] = useState([]);

    //especie
    const [especie, setEspecie] = useState({});
    const [especieOptions, setEspecieOptions] = useState([]);

    //fase
    const [fase, setFase] = useState({});

    const [dados, setDados] = useState({
        idadeInicial: '',
        pesoMedioIndividualInicial: '',
        quantidadeEstimadaPeixes: '',
    });

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);

                const [tanquesResponse, especiesResponse] = await Promise.all([
                    axiosPrivate.get(`/users/${auth.id}/tanques`),
                    axiosPrivate.get(`/users/${auth.id}/especies`)
                ]);

                if (isMounted) {
                    setTanqueOptions(tanquesResponse.data);
                    setEspecieOptions(especiesResponse.data);
                }
            } catch (err) {
                if (isMounted) {
                    setErrMsg('Erro ao carregar os dados.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [auth.id, axiosPrivate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
    }

    if (loading) {
        return (
            <>
                <img src={producoesIcon} className="modal-icon" alt="Ícone de produções" style={{ border: 'none' }} />
                {errMsg && <p className="errMsg">{errMsg}</p>}
                <h2 className='modal-title'>Adicionar Produção</h2>
                <p>Adicione uma produção para gerenciar seu negócio.</p>
                <Carregando />
            </>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <img src={producoesIcon} className="modal-icon" alt="Ícone de produções" style={{ border: 'none' }} />
            {errMsg && <p className="errMsg">{errMsg}</p>}
            <h2 className='modal-title'>Adicionar Produção</h2>
            <p>Adicione uma produção para gerenciar seu negócio.</p>
            <div className='line-container-select'>
                <div className='InputContainer'>
                    <label>Selecione o tanque*: </label>
                    {
                        tanqueOptions.length ?
                            <Dropdown label={'nome'} options={tanqueOptions} value={tanque} onChange={setTanque} />
                            : <p className='sem-dados-dropdown'>Você não possui tanques. <Link to={`/users/${auth.id}/tanques`}>Adicione um tanque</Link> para usar este recurso.</p>
                    }
                </div>
                <div className='InputContainer'>
                    <label>Selecione a espécie*: </label>
                    {
                        especieOptions.length ?
                            <Dropdown label={'nome'} options={especieOptions} value={especie} onChange={setEspecie} />
                            : <p className='sem-dados-dropdown'>Você não possui especies. <Link to={`/users/${auth.id}/especies`}>Adicione uma espécie</Link> para usar este recurso.</p>
                    }
                </div>
            </div>
            <div className='line-container'>
                <div className='InputContainer'>
                    <label htmlFor='idadeInicial'>Idade inicial*(dias): </label>
                    <input
                        id='idadeInicial'
                        type='number'
                        value={dados.idadeInicial}
                        onChange={(e) => setDados({ ...dados, idadeInicial: e.target.value })}
                        required
                        min={0}
                        step={".01"}
                    />
                </div>
                <div className='InputContainer'>
                    <label htmlFor='pesoMedio'>Peso médio individual inicial*(gramas): </label>
                    <input
                        id='pesoMedio'
                        type='number'
                        value={dados.pesoMedioIndividualInicial}
                        onChange={(e) => setDados({ ...dados, pesoMedioIndividualInicial: e.target.value })}
                        required
                        min={0}
                        step={".01"}
                    />
                </div>
            </div>
            <div className='line-container-select'>
                <div className='InputContainer'>
                    <label htmlFor='qntPeixes'>Quantidade estimada de peixes*: </label>
                    <input
                        id='qntPexies'
                        type='number'
                        value={dados.quantidadeEstimadaPeixes}
                        onChange={(e) => setDados({ ...dados, quantidadeEstimadaPeixes: e.target.value })}
                        required
                        min={0}
                        step={".01"}
                    />
                </div>
                <div className='InputContainer'>
                    <label htmlFor='pesoMedio'>Fase inicial: </label>
                    <Dropdown label={'label'} options={faseOptions} value={fase} onChange={setFase} />
                </div>
            </div>
            <button
                type='submit'
                className='modal-confirm-button'
                disabled={!tanque.id || !especie.id || !fase.value || !dados.idadeInicial || !dados.pesoMedioIndividualInicial || !dados.quantidadeEstimadaPeixes}
            >
                Confirmar
            </button>
        </form>
    );
}