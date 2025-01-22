import { NavLink } from "react-router-dom";
import './MenuListItem.css';

function MenuListItem({ to, icon: Icon, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? 'selected' : 'menu-list-item-link'}
        >
            {Icon && <Icon className='menu-list-item-icon' />}
            <span>{children}</span>
        </NavLink>
    );
}

export default MenuListItem;
