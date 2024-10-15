import { Outlet } from "react-router-dom";
import Menu from "../components/menuComp/Menu";
import './layout.css';
import useWindowSize from '../hooks/use-window-size';
import CompactMenu from "../components/compactMenuComp/CompactMenu";

function Layout() {
    const { width } = useWindowSize();

    return (
        <div className="mainLayout">
            {/*   width < 1000 
                ? <CompactMenu />
                : <Menu />
            */}
            <Menu />
            <Outlet />
        </div>
    );
}

export default Layout;