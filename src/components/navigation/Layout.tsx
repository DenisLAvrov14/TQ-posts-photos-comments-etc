import { Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import Home from "../screens/Home"

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}
export { Layout }