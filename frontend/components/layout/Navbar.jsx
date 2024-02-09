import React from "react"
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react"
import { useAppStore } from "/frontend/store/store";

const Navbar = () => {

    const { userInfo, setUserInfo } = useAppStore();
    const { isConnected } = useConnect({
        onDisconnect: () => {
            setUserInfo(null);
          }
    });

    return (
        <div className="w-full h-20 flex flex-col justify-center border-b border-b-gray-200">
            <div className="flex items-center justify-between px-20">
            <ul className="w-100 flex flex-row gap-5">
                <li><a href="/">Home</a></li>
                <li><a href="#">DAO</a></li>
            </ul>
            <div className="flex flex-row">
                {userInfo && <span className="my-auto mx-3">Hi, {userInfo.name}</span>}
                <ConnectButton />
            </div>
            </div>
            <ConnectDialog />
        </div>
    )
}

export default Navbar;