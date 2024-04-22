import './NavBar.css';
import logo from '../img/logoContornoPreto.png';

function NavBar() {
    return (
        <nav className="NavBar">
            <header>
                <img src={logo} alt="logo" />
            </header>
            <div className='NavContent'>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;