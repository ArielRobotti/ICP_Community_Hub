import Card from "../../components/common/Card"
import React, { useState, useEffect } from "react"
import { Tutorial } from "./types"
import { useCanister } from "@connect2ic/react"

const Incoming = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [backend] = useCanister("backend")

  const fetchTutorials = async () => {
    const res = (await backend.getIncomingPublication()) as Tutorial[]
    console.log("Publications are: ", res)
    setTutorials(res)
  }

  useEffect(() => {
    fetchTutorials()
  }, [])

  return (
    <div className="p-10 min-h-[90vh]">
      <div className="flex flex-row justify-between w-100">
        <h1 className="text-3xl font-bold">Todos los tutoriales</h1>
        <button className="rounded-full bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Nuevo
        </button>
      </div>
      <div className="flex flex-col gap-5 pt-5">
        {tutorials.map((tutorial, index) => (
          <Card
            key={index}
            title={tutorial?.title}
            description={tutorial?.description}
            author={tutorial?.author}
            readTime={5}
          ></Card>
        ))}
      </div>
    </div>
  )
}

export default Incoming
