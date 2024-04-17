import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import './layout.css';
import logoBranco from '../img/logoContornoBranco.png';

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
            <Header title={getTitle()} />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;