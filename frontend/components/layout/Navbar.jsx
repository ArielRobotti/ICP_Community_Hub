import React from "react"
import { ConnectButton, ConnectDialog } from "@connect2ic/react"

const Navbar = () => {

    return (
        <>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#dao">DAO</a></li>
                <ConnectButton />
            </ul>
            <ConnectDialog />
        </>
    )
}

export default Navbar;