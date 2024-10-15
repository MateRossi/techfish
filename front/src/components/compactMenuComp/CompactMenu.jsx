import './CompactMenu.css';

export default function CompactMenu({  }) {
    return (
        <nav className='campact-navbar'>
            <header>
                <img src={logo} alt='Logo tecfish'/>
            </header>
            <div className='campact-nav-content'>
                <Link>Teste</Link>
            </div>
        </nav>
    );
}