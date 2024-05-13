import './NavBar.css';
import aquario from '../img/contornoAquario.svg';
import dinheiro from '../img/dinheiro.svg';
import peixe from '../img/peixe.svg';
import perfil from '../img/perfil.svg';

function NavBar() {
    return (
        <nav className="NavBar">
            <header>
                <h2>tecfish</h2>
            </header>
            <div className='NavContent'>
                <ul>
                    <li><img className='ListItemIcon' src={aquario} alt="ícone tanque" />Tanques</li>
                    <li><img className='ListItemIcon' src={peixe} alt="ícone peixe" />Espécies</li>
                    <li><img className='ListItemIcon' src={dinheiro} alt="ícone faturamento" />Faturamento</li>
                    <li><img className='ListItemIcon' src={perfil} alt="ícone perfil" />Perfil</li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;