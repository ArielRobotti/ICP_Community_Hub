import Card from "../../components/common/Card"
import React, { useState, useEffect } from "react"
import { Tutorial } from "./types"
import { useCanister } from "@connect2ic/react"
import { useNavigate } from "react-router-dom"

const Incoming = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [backend] = useCanister("backend");
  const navigate = useNavigate();

  const fetchTutorials = async () => {
    const res = (await backend.getIncomingPublication()) as Tutorial[];
    console.log("Publications are: ", res);
    setTutorials(res);
  };

  const handleApproval = async (tutoId: number) => {
    const res = await backend.aprovePublication(tutoId);
    if (res){
      console.log("Tutorial aproved", res);
    }
    else {
      console.log("Approve failed");
    }
  };

  const handleVote = async (tutoId: number, vote: boolean) => {
    const res = await backend.votePublication(tutoId, vote);
    if (res){
      console.log("Tutorial voted", res);
    }
    else {
      console.log("Voting failed");
    }
  };

  const adminFooter = (tutoId: number) => {
    return (
      <button onClick={() => handleApproval(tutoId)}>Approve</button>
    );
  };


  const daoMemberFooter = (index: number) => {
    return (
      <div className="flex flex-row justify-between">
        <button onClick={() => handleVote(index, true)}>Vote Yes</button>
        <button onClick={() => handleVote(index, false)}>Vote no</button>
      </div>
    );
  };

  useEffect(() => {
    fetchTutorials();
  }, [])

  return (
    <div className="p-10 min-h-[90vh]">
      <div className="flex flex-row justify-between w-100">
        <h1 className="text-3xl font-bold">Tutorials pending approvals</h1>
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
            onClick= {() => navigate(`/tutorials/${tutorial.id}`)}
            footer={isAdmin ? adminFooter : daoMemberFooter}></Card>
        ))}
      </div>
    </div>
  )
}

export default Incoming
