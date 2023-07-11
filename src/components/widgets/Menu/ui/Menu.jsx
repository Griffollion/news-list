import { NavLink } from 'react-router-dom';
import { cn } from 'classnames'
import styles from './Menu.module.css'


function Menu() {
    return (
        <ul className={styles.menu}>
            <li>
                <NavLink
                    to="/news-list"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? styles.active : ""
                    }
                >
                    Новости за сегодня
                </NavLink>

            </li>
            <li>
                <NavLink
                    to="/news-list/all"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? styles.active : ""
                    }
                >
                    Все новости
                </NavLink>
            </li>
        </ul>
    );
}

export default Menu;