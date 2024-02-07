import React from "react"
import { useNavigate } from "react-router-dom";
import { useConnect } from "@connect2ic/react"

const Home = () => {

  const navigate = useNavigate();
  const { isConnected } = useConnect();

  if (isConnected){ 
    navigate("tutorials/incoming")
  }

  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-300 dark:hover:ring-gray-200 dark:text-gray-100">
          Part of the ICP Zero to Dapp Hackathon.{" "}
          <a
            href=""
            className="font-semibold text-indigo-600"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            Read <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-200">
          Become a part of the ICP Community
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100">
          Learn from the best, create your own courses, tutorials, ask your
          questions, answer and get answers. All in one hub.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://internetcomputer.org/docs/current/home"
            className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  )
}

export { Home }
