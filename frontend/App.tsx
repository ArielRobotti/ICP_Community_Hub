import React, { useEffect } from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers"
import { Connect2ICProvider, useCanister, useConnect } from "@connect2ic/react"
import "@connect2ic/core/style.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import * as backend from "../.dfx/local/canisters/backend"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { Home } from "./pages/home"
import { New } from "./pages/tutorials/new"
import Incoming from "./pages/tutorials/incoming"

function App() {
  const [backend] = useCanister("backend");
  const checkUser = async () => {
    // console.log(await backend.getMiUser());
    console.log(await backend.whoAmi());
    console.log("hola")
  };
  const { isConnected, principal, activeProvider, status,isInitializing , isConnecting, isIdle} = useConnect();
  
  // useEffect(() => {
  //   if (isConnected){
  //     console.log(principal)
      
  //     checkUser();
  //   }
  // }, [isConnected]);
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {

        console.log(principal);
        console.log("--------------------");
        console.log("isConnecting: ", isConnecting);
        console.log("isConnected: ", isConnected);
        console.log("isIdle: ", isIdle);
        console.log("--------------------");
        console.log("activeProvider: " ,activeProvider);
        console.log("status: " ,status);
        console.log("isInitializing: ", isInitializing);


        
        await checkUser();
      }
    };
  
    fetchData();
  }, [isConnected, principal]);

  return (
    <Router>
      <div className="App dark:bg-slate-800 dark:text-white">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" Component={Home}></Route>
          {/* <Route path="/tutorials/incoming" Component={Incoming}></Route> */}
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
