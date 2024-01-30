import React from "react"
import logo from "./assets/dfinity.svg"
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
import { Profile } from "./components/Profile"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={Profile}></Route>
        </Routes>
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
