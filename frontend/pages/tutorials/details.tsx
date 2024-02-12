import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Tutorial } from "./types";

const Details = () => {

  const [ tutorial, setTutorial ] = useState<Tutorial>();
  const id = useParams();
  const [backend] = useCanister("backend");


  useEffect(() => {
    const getData = async () => {
      const data = await backend.getPubByID(id) as Tutorial;
      setTutorial(data);
    };

    if (id) {
      getData();
    }
  }, [id]);

  return (
    <div className="p-10 min-h-[90vh]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-5xl">{tutorial?.content.title}</h2>
          <span className="text-lg">
            {tutorial?.content.description}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">
              by {tutorial?.autor}
            </h3>
            <p>{tutorial?.date}</p>
            {/* TODO: Add comment section*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
