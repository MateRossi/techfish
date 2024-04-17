import { Link } from 'react-router-dom';
import logoContornoBranco from '../img/logoContornoBranco.png';
import './Header.css';

function Header({ title }) {
    return (
        <header className="Header">
            <div className="navContainer">
                <div className='logoName'>
                    <img src={logoContornoBranco} alt="logo da Tec-Fish, branco" className='headerLogo' />
                    TEC-FISH
                </div>
                <nav>
                    <ul>
                        <li>HOME</li>
                        <li>TANQUES</li>
                        <li>MONITORAMENTO</li>
                        <Link to={'/'}><li>SAIR</li></Link>
                    </ul>
                </nav>
            </div>
            <div>
                <h1>{title}</h1>
            </div>
        </header>
    );
}

export default Header;