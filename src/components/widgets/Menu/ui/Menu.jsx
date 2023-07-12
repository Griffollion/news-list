import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames'
import styles from './Menu.module.css'
import { useLocation } from "react-router-dom";


function Menu() {
    const location = useLocation();
    return (
        <ul className={styles.menu}>
            <li>
                <NavLink
                    to="/news-list"
                    className={cn({
                        [styles.active]: location.pathname === "/news-list"
                    })}
                >
                    Сегодняшние новости
                </NavLink>

            </li>
            <li>
                <NavLink
                    to="/news-list/all"
                    className={cn({
                        [styles.active]: location.pathname === "/news-list/all"
                    })}
                >
                    Все новости
                </NavLink>
            </li>
        </ul>
    );
}

export default Menu;