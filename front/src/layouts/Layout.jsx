import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import './layout.css';

function Layout() {

    return (
        <div className="mainLayout">
            <Menu />
            <Outlet />
        </div>
    );
}

export default Layout;