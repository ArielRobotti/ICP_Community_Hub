import React from "react"
import { ConnectButton, ConnectDialog } from "@connect2ic/react"

const Navbar = () => {

    return (
        <div className="w-full h-20 flex flex-col justify-center border-b border-b-gray-200">
            <div className="flex items-center justify-between px-20">
            <ul className="w-100 flex flex-row gap-5">
                <li><a href="#">Home</a></li>
                <li><a href="#">DAO</a></li>
            </ul>
            <ConnectButton />
            </div>
            <ConnectDialog />
        </div>
    )
}

export default Navbar;