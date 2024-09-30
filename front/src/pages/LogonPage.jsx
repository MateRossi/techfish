import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useEffect, useRef, useState } from "react";
import useToggle from "../hooks/use-toggle";
import Checkbox from "../components/checkboxComp/Checkbox";
import { RiAccountCircleFill } from "react-icons/ri";
import axios from "../api/axios";
import * as jose from 'jose';
import './Page.css';
import './LoginPage.css';

const REGISTER_URL = '/register';

function LogonPage() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userNameRef = useRef();
    const errRef = useRef();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userNameRef.current.focus()
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [userNameRef, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    nome: userName,
                    email: email,
                    senha: pwd,
                    confirmarSenha: matchPwd,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;

            const decodedToken = jose.decodeJwt(accessToken);

            const { id, name, role } = decodedToken.UserInfo;

            setAuth({ id, name, role, accessToken });
            setPwd('');
            setErrMsg('');
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
            } else if (err.response?.status === 409) {
                setErrMsg('Este usuário já existe');
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
                    <Link to={'/auth'}>
                        <button>
                            <RiAccountCircleFill className="Icon" /> Já possuo conta.
                            <span style={{ color: 'rgba(20, 20, 243, 0.6)', textDecoration: 'underline', marginLeft: '4px' }}>
                                Entrar!
                            </span>
                        </button>
                    </Link>
                </header>
                <h1>Crie uma conta</h1>
                <p className="Subtitle">Sua conta é o portal de acesso ao recursos de monitoramento de piscicultura e muito mais!</p>
                <div className="Separator"><hr /><span className="HrText">Bem-vindo(a)!</span><hr /></div>
                <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <div className="InputContainer">
                        <label htmlFor="nome">Nome: </label>
                        <input
                            id="nome"
                            type="text"
                            placeholder="Insira o seu nome"
                            ref={userNameRef}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="InputContainer">
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Insira seu email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="InputContainer">
                        <label htmlFor="senha">Senha: </label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="Insira sua senha"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="InputContainer">
                        <label htmlFor="confirmarSenha">Confirmar senha: </label>
                        <input
                            id="confirmarSenha"
                            type="password"
                            placeholder="Insira sua senha novamente"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <button type="submit">Cadastrar</button>
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

export default LogonPage;