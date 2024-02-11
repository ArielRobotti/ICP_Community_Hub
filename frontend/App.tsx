
import { Actor, HttpAgent } from '@dfinity/agent';
import * as Dao from '../.dfx/local/canisters/dao/dao.did.js';



import React, { useEffect } from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers"
import { Connect2ICProvider, useCanister, useConnect } from "@connect2ic/react"
import "@connect2ic/core/style.css"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import * as backend from "../.dfx/local/canisters/backend"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { Home } from "./pages/home"
import { New } from "./pages/tutorials/new"
import Incoming from "./pages/tutorials/incoming"

function App() {
  const { isConnected, principal} = useConnect();
  const [backend] = useCanister("backend");

  
  
  const rightToVote = async () => {
    let isDao = await backend.isDaoDeployed();
    if (isDao){
      let daoPrincipal = String(await backend.getPrincipalDao());
      console.log("Dao Principal: ", daoPrincipal) //OK

      const agent = new HttpAgent({});
      const dao = Actor.createActor(Dao.idlFactory, { agent, canisterId: daoPrincipal });

      // let member = await dao.isAMember(principal);
      console.log(await dao.getName()); // OK
      // console.log(await dao.whoAmi()); // Error: Fail to verify certificate
      // console.log("El usuario es miembro? ", member)
      // return member;
    }
    else{
      let admin = await backend.iamAdmin();
      console.log("El usuario ea admin? ", admin)
      return admin;
    };
  };
  
  const userDaoMember = rightToVote();

  console.log(userDaoMember);
  const checkUser = async () => {
    // console.log(await backend.getMiUser());
    console.log(await backend.whoAmi());
    console.log("hola")
  };
  
  // useEffect(() => {
  //   if (isConnected){
  //     console.log(principal)
      
  //     checkUser();
  //   }
  // }, [isConnected]);
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {

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

const client = createClient({
  canisters: {
    backend,
  },
  providers: [
    new InternetIdentity({
      dev: true,
      // The url for the providers frontend
      providerUrl:
        "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai",
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
