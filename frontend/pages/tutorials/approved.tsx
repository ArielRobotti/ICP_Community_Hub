import React, { useEffect, useState } from "react";
import { Tutorial } from "./types";
import { useCanister } from "@connect2ic/react";
import Card from "frontend/components/common/Card";
import { useNavigate } from "react-router-dom";

const Approved = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [backend] = useCanister("backend");
  const navigate = useNavigate();


  const fetchTutorials = async () => {
    const res = (await backend.getAprovedPublication()) as Tutorial[];
    console.log("Publications are: ", res);
    setTutorials(res);
  };

  useEffect(() => {
    fetchTutorials();
  }, [])

  return (
    <div className="p-10 my-6">
      <div className="flex flex-row justify-between w-100">
        <h1 className="text-3xl font-bold">Tutorials</h1>
        <button className="rounded-full bg-indigo-600 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          New
        </button>
      </div>
      <div className="flex flex-col gap-5 pt-5">
        {tutorials.map((tutorial, index) => (
          <Card
            key={index}
            title={tutorial?.content.title}
            description={tutorial?.content.description}
            author={tutorial?.autor}
            readTime={5}
            onClick={() => navigate(`/tutorials/${tutorial.id}`) }
            footer={undefined}></Card>
        ))}
      </div>
    </div>
  )
}

export default Approved
