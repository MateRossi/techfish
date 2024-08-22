import { NavLink } from "react-router-dom";
import './MenuListItem.css';

function MenuListItem({ to, icon: Icon, children }) {
    return (
        <li className="menu-list-item">
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? 'selected' : 'menu-list-item-link'}
            >
                {Icon && <Icon className='menu-list-item-icon' />}
                {children}
            </NavLink>
        </li>
    );
}

export default MenuListItem;
