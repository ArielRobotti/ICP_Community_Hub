import React, { useState } from "react"
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react"
import { useAppStore } from "/frontend/store/store"
import { Link, useNavigate } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx"
import ContextMenu from "../auth/ContextMenu"
import logo from "/frontend/assets/Icptutorials-logo.png"
import profile from "/frontend/assets/avatar-default.jpg"

const Navbar = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const { isConnected } = useConnect({
    onDisconnect: () => {
      setUserInfo(null)
    },
  })
  const navigate = useNavigate()
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)

  const contextMenuOptions = [
    {
      name: "About",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
  ]

  const authenticatedMenuOptions = [
    {
      name: "Dashboard",
      callBack: () => {
        setIsContextMenuVisible(false)
        navigate("/tutorials/incoming")
      },
    },
    {
      name: "New Tutorial",
      callBack: () => {
        setIsContextMenuVisible(false)
        navigate("/tutorials/new")
      },
    },
    {
      name: "Help ",
      callBack: () => {
        setIsContextMenuVisible(false)
      },
    },
  ]

  return (
    <nav>
      <div className="w-full h-20 flex flex-col justify-center border-b border-b-gray-200 dark:bg-zinc-950 dark:text-white dark:border-0">
        <div className="flex items-center justify-between px-20">
          <div className="flex flex-row gap-5 items-center">
            <Link className="w-max cursor-pointer" to={"/"}>
              <img src={logo} alt="logo" className="w-10" />
            </Link>
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>DAO</Link>
          </div>
          <div className="flex flex-row items-center gap-5">
            <ConnectButton />
            <div className="block">
              <div
                className="flex cursor-pointer items-center gap-2 border border-grey-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
                onClick={() => {
                  setIsContextMenuVisible(!isContextMenuVisible)
                }}
              >
                <RxHamburgerMenu></RxHamburgerMenu>
                {userInfo ? (
                  userInfo.avatar?.length > 0 ? (
                    <span>
                      <img
                        src={userInfo.avatar[0]}
                        alt="profile"
                        height={30}
                        width={30}
                        className="rounded-full"
                      />
                    </span>
                  ) : (
                    <span className="flex justify-center items-center bg-black text-white h-7 w-7 text-sm rounded-full">
                      {userInfo.name?.split("").shift().toUpperCase()}
                    </span>
                  )
                ) : (
                  <span>
                    <img
                      src={profile}
                      alt="profile"
                      height={30}
                      width={30}
                      className="rounded-full"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <ConnectDialog />
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          cordinates={{
            x: window.innerWidth - 200,
            y: 70,
          }}
          options={userInfo ? authenticatedMenuOptions : contextMenuOptions}
        ></ContextMenu>
      )}
    </nav>
  )
}

export default Navbar
