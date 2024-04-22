import { Outlet, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import './layout.css';
import logoBranco from '../img/logoContornoBranco.png';
import Title from "../components/Title";

function Layout() {
    const location = useLocation();

    const getTitle = () => {
        const pathname = location.pathname;
        if (pathname === '/') {
            return <img src={logoBranco} alt="Logo" style={{maxWidth:'200px'}}/>
        }
        const title = pathname.split('/').pop();
        return title;
    }

    return (
        <div className="mainLayout">
            <Menu title={getTitle()} />
            <Title />
            <Outlet />
        </div>
    );
}

export default Layout;