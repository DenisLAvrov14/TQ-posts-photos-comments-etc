import { NavLink } from 'react-router-dom'


export const NavBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to="/photos">Photos</NavLink>
                    </li>

                    <li>
                        <NavLink to="/posts">Posts</NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    )
}