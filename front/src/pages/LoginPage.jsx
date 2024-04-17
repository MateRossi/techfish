import { useNavigate } from "react-router-dom";
import './Page.css';
import './LoginPage.css';
import { Link } from "react-router-dom";
import { RiAccountCircleFill, RiGoogleFill, RiFacebookCircleFill } from "react-icons/ri";

function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/monitoramento');
    }

    return (
        <main className="Content">
            <section className="LoginContainer">
                <header className="LoginHeader">
                    <h2>tecfish</h2>
                    <Link to={'/logon'}>
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
                <button className=""><RiFacebookCircleFill className="Icon" />Entrar com Facebook</button>
                <button><RiGoogleFill className="Icon" />Entrar com Google</button>
                <div className="Separator"><hr /><span className="HrText">ou</span><hr /></div>
                <form onSubmit={handleSubmit}>
                    <div className="InputContainer">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Insira seu email ou nome de usuário"
                        />
                    </div>


                    <div className="InputContainer">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="text"
                            placeholder="Insira sua senha"
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>
            </section>
            <section className="Graphics">
            </section>
        </main>
    )
}

export default LoginPage;