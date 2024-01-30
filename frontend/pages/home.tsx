import React from "react"
import { useConnect } from "@connect2ic/react";

const Home = () => {
    const { principal } = useConnect();

    return (
        <div>
            <h1>Home Page</h1>
            <p> My ID is: {principal}</p>
        </div>
    )
}

export { Home }