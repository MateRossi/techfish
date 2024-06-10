import './NavBar.css';
import aquario from '../img/contornoAquario.svg';
import dinheiro from '../img/dinheiro.svg';
import peixe from '../img/peixe.svg';
import perfil from '../img/perfil.svg';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

function NavBar() {
    const { auth } = useAuth();

    return (
        <nav className="NavBar">
            <header>
                <h2>tecfish</h2>
            </header>
            <div className='NavContent'>
                <ul>
                    <li><Link to={`/users/${auth.id}/tanques`}><img className='ListItemIcon' src={aquario} alt="ícone tanque" />Tanques</Link></li>
                    <li><Link to='/especies'><img className='ListItemIcon' src={peixe} alt="ícone peixe" />Espécies</Link></li>
                    <li><Link to='/faturamento'><img className='ListItemIcon' src={dinheiro} alt="ícone faturamento" />Faturamento</Link></li>
                    <li><Link to='/perfil'><img className='ListItemIcon' src={perfil} alt="ícone perfil" />Perfil</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;