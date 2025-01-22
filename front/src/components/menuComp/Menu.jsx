import './Menu.css';
import TanqueIcon from '../../icons/TanqueIcon';
import CasaIcon from '../../icons/CasaIcon';
import EspeciesIcon from '../../icons/EspeciesIcon';
import logo from '../../img/logo.svg';
import useAuth from '../../hooks/use-auth';
import MenuListItem from '../menuListItemComp/MenuListItem';
import GanhosIcon from '../../icons/GanhosIcon';
import SairIcon from '../../icons/SairIcon';
import DeviceIcon from '../../icons/DeviceIcon';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/use-logout';
import PerfilIcon from '../../icons/PerfilIcon';
import AparelhoIcon from '../../icons/AparelhoIcon';

function Menu() {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/auth');
    }

    return (
        <nav className="nav-bar">
            <header>
                <img src={logo} alt="logo tecfish" />
                <h2>tec<span style={{ color: '#0A84FF' }}>4fish</span></h2>
            </header>
            <div className='nav-content'>
                <MenuListItem to='/' icon={CasaIcon}>
                    Home
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/tanques`} icon={TanqueIcon}>
                    Meus Tanques
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/aparelhos`} icon={AparelhoIcon}>
                    Meus Aparelhos
                </MenuListItem>
                <MenuListItem to={`/users/${auth.id}/especies`} icon={EspeciesIcon}>
                    Espécies
                </MenuListItem>
                {/*
                    <MenuListItem to={`/users/${auth.id}/fases`} icon={TanqueIcon}>
                    Fases de Produção
                </MenuListItem>
                */}
                <MenuListItem to={`/users/${auth.id}/financeiro`} icon={GanhosIcon}>
                    Finanças
                </MenuListItem>
            </div>

            <div className='user-profile-info'>
                <div className='user-name-and-pic'><PerfilIcon className="perfil-icon" />
                    <span>
                        <span className='nome-user'>{auth.name}</span> <br />
                        <span className='papel-user'>{auth.role}</span>
                    </span>
                </div>
                <button className='sair-button' onClick={signOut}><SairIcon className="sair-icon" /><span>Sair</span></button>
            </div>
        </nav>
    );
}

export default Menu;
