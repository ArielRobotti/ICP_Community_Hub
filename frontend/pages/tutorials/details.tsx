import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Tutorial } from "./types";
import ReactMarkdown from "react-markdown"

const Details = () => {

  const [tutorial, setTutorial] = useState<Tutorial>();
  const [autor, setAutor] = useState<String>();
  const { id } = useParams<{ id: string }>();
  const [backend] = useCanister("backend");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      type Response = { pub: Tutorial; autor: String };
      const _id = BigInt(id);
      const response = await backend.getPubByID(_id) as Response;
      setAutor(response.autor)
      setTutorial(response.pub);
    };

    if (id) {
      getData();
    }
  }, [id]);

  if (tutorial != undefined) {
    console.log(tutorial?.autor)
    return (
      <div className="p-10 min-h-[90vh]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl text-center" >{tutorial?.content.title}</h2>
            <span className="text-lg text-center">
              {tutorial?.content.description}
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-center">
                by {autor}
              </h3>
              <p>{tutorial?.date}</p>
              {/* TODO: Add comment section*/}
            </div>
          </div>
          <div className="text-center">
            {tutorial?.content.html.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="p-10 min-h-[90vh]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1 ">
            <h2 className="text-5xl text-center">Error 404</h2>
            <h2 className="text-5xl text-center">El tutorial no existe</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
