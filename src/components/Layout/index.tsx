import React from 'react';
import {Link, Outlet} from "react-router-dom";
import st from "./style.module.css"


const Layout = () => {
    return (
        <>
            <header className={st.header_part}>
                <nav className={"navbar navbar-dark bg-dark"}>
                    <ul className={st.ul_part}>
                        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}> Home </Link></li>

                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
