import './Menu.css';
import TanqueIcon from '../../icons/TanqueIcon';
import CasaIcon from '../../icons/CasaIcon';
import EspeciesIcon from '../../icons/EspeciesIcon';
import logo from '../../img/logo.svg';
import useAuth from '../../hooks/use-auth';
import MenuListItem from '../menuListItemComp/MenuListItem';
import GanhosIcon from '../../icons/GanhosIcon';
import SairIcon from '../../icons/SairIcon';
import { Link } from 'react-router-dom';
import PerfilIcon from '../../icons/PerfilIcon';

function Menu() {
    const { auth } = useAuth();

    return (
        <nav className="nav-bar">
            <header>
                <img src={logo} alt="logo tecfish" />
                <h2>tec<span style={{ color: '#0A84FF' }}>fish</span></h2>
            </header>
            <div className='nav-content'>
                <MenuListItem to='/' icon={CasaIcon}>
                    Home
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/tanques`} icon={TanqueIcon}>
                    Meus Tanques
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/especies`} icon={EspeciesIcon}>
                    Espécies
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/fases`} icon={TanqueIcon}>
                    Fases de Produção
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/faturamento`} icon={GanhosIcon}>
                    Faturamento
                </MenuListItem>
            </div>

            <div className='user-profile-info'>
                <div className='user-name-and-pic'><PerfilIcon className="perfil-icon" />
                    <span>
                        <span className='nome-user'>{auth.name}</span> <br />
                        <span className='papel-user'>{auth.role}</span>
                    </span>
                </div>
                <Link className='sair-link' to='/'><SairIcon className="sair-icon" />Sair</Link>
            </div>
        </nav>
    );
}

export default Menu;
