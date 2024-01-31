import React from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
/*
 * Import canister definitions like this:
 */
//import * as counter from "../.dfx/local/canisters/counter"
/*
 * Some examples to get you started
 */
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { Home } from "./pages/home"
import { New } from "./pages/tutorials/new"

function App() {
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
  canisters: {},
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
