import './Page.css';
import './LoginPage.css';
import useAuth from '../hooks/use-auth';
import useInput from '../hooks/use-input';
import useToggle from '../hooks/use-toggle';
import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import * as jose from 'jose';
import axios from '../api/axios';
import Checkbox from "../components/checkboxComp/Checkbox";

const LOGIN_URL = '/auth';

function LoginPage() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, attributeObj] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, senha: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data);

            const accessToken = response?.data?.accessToken;

            const decodedToken = jose.decodeJwt(accessToken);

            const { id, name, role } = decodedToken.UserInfo;

            setAuth({ id, name, role, accessToken });
            resetUser();
            setPwd('');
            navigate(`/users/${id}/tanques`, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta do servidor.');
                console.error(err.message);
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Acesso não autorizado. Verifique seu e-mail ou senha.');
            } else if (err.response?.status === 404) {
                setErrMsg('Usuário não encontrado');
            } else {
                setErrMsg('Login failed', err.message);
            }
            errRef.current.focus();
        }
    }

    return (
        <main className="Content">
            <section className="LoginContainer">
                <header className="LoginHeader">
                    <h2>tecfish</h2>
                    <Link to={'/register'}>
                        <button>
                            <RiAccountCircleFill className="Icon" /> Sou novo aqui.
                            <span style={{ color: 'rgba(20, 20, 243, 0.6)', textDecoration: 'underline', marginLeft: '4px' }}>
                                Criar Conta!
                            </span>
                        </button>
                    </Link>
                </header>
                <h1>Acesse sua conta</h1>
                <p className="Subtitle">Sua conta é o portal de acesso ao recursos de monitoramento de piscicultura e muito mais!</p>
                <div className="Separator"><hr /><span className="HrText">Olá novamente!</span><hr /></div>
                <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <div className="InputContainer">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Insira seu email"
                            ref={userRef}
                            autoComplete="off"
                            {...attributeObj}
                            required
                        />
                    </div>

                    <div className="InputContainer">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Insira sua senha"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>
                <Checkbox
                    onChange={toggleCheck}
                    label="Manter autenticado"
                    checked={check}
                />
                <footer className="footer">
                    <p>Tecfish, 2024</p>
                </footer>
            </section>
            <section className="Graphics"></section>
        </main>
    )
}

export default LoginPage;