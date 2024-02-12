import React, { useEffect } from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers"
import { defaultProviders } from "@connect2ic/core/providers"
import { useCanister, useConnect } from "@connect2ic/react"

import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import { Home } from "./pages/home"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { New } from "./pages/tutorials/new"
import * as backend from "../src/declarations/backend"
import {User} from "../src/declarations/backend/backend.did";
import * as dao from "../src/declarations/backend";


function App() {
  const [backend] = useCanister("backend");
  const checkUser = async () => {
    const res = await backend.getMiUser()
    console.log(await backend.whoAmi());
    console.log(res);
  };
  const { isConnected, principal } = useConnect();
  
  useEffect(() => {
    if (isConnected){
      console.log(principal)
      
      checkUser();
    }
  }, [isConnected]);
  return (
    <Router>
      <div className="App dark:bg-slate-800 dark:text-white">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/tutorials/new" Component={New}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  )
}


const client = createClient({
  canisters: {
    backend,
    dao
  },
  providers: [
    new InternetIdentity({
      dev: true,
      // The url for the providers frontend
      providerUrl: "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai",
    })
  ],
  globalProviderConfig: {
    // dev: import.meta.env.DEV,
    dev: true,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
