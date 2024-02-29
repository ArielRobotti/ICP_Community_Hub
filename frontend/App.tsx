


import React, { useEffect } from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { Actor, HttpAgent } from '@dfinity/agent';
import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers"
import { Connect2ICProvider, useCanister, useConnect } from "@connect2ic/react"
import "@connect2ic/core/style.css"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// import * as backend from "../.dfx/local/canisters/backend"
import * as backend from "../src/declarations/backend"
import * as Dao from '../src/declarations/dao';

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { Home } from "./pages/home"
import { New } from "./pages/tutorials/new"
import Incoming from "./pages/tutorials/incoming"
import Approved from "./pages/tutorials/approved"
import Details from "./pages/tutorials/details"

function App() {
  const { isConnected, principal} = useConnect();
  const [backend] = useCanister("backend");

  
  
  const rightToVote = async () => {
    let isDao = await backend.isDaoDeployed();
    console.log("Dao deployed? ", isDao);
    if (isDao){
      /*let daoPrincipal = String(await backend.getPrincipalDao());
      console.log("Dao Principal: ", daoPrincipal) //OK

      const agent = new HttpAgent({});
      const dao = Actor.createActor(Dao.idlFactory, { agent, canisterId: daoPrincipal });

      console.log(await dao.getName()); // OK
      console.log(await dao.whoAmi()); // Error: Fail to verify certificate
      let member = await dao.isAMember(principal);
      return member;
      */
      //----- Modificar al solucionar Front -> DAO ------
      let isMember = await backend.userIsDaoMember();
      console.log("Is Dao member? ", isMember);
      return isMember? true: false;
      
    }
    else{
      let isAdmin = await backend.iamAdmin();
      console.log("Is admin? ", isAdmin);
      return isAdmin ? true: false;      
    };
  };
  
  let userDaoMember = false;

  const checkUser = async () => {
    console.log(await backend.whoAmi());
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        userDaoMember = await rightToVote();
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
          <Route path="/tutorials" Component={Approved}></Route>
          <Route path="/tutorials/:id" Component={Details}></Route>
          <Route 
            path="/tutorials/incoming" 
            element={userDaoMember ? <Incoming /> : <Navigate to="/" />}
          />
          <Route
            path="/tutorials/new"
            element={isConnected ? <New /> : <Navigate to="/" />}
          />

        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  )
}
declare let process : {
  env: {
    DFX_NETWORK: string
    NODE_ENV: string
  }
}
const network = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");
const internetIdentityUrl = network === "local" ? "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai" : "https://identity.ic0.app"

const client = createClient({
  canisters: {
    backend,
  },
  providers: [
    new InternetIdentity({
      dev: true,
      // The url for the providers frontend
      providerUrl:
      internetIdentityUrl,
        // "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai",
    }),
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
