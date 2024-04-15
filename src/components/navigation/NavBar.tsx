import { NavLink } from 'react-router-dom'
import styles from "./NavBar.module.css"


export const NavBar = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/gallery">Gallery</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts">Posts</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}