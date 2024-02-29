import React, { useState } from "react"
import Button from "../../components/common/Button"
import { useCanister } from "@connect2ic/react"
import TextAreaMD from "../../components/common/TextAreaMD"

const New = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [html, setHtml] = useState("")
  const [backend] = useCanister("backend")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title && html) {
      const content = {
        title: title,
        description: description,
        html: html,
        tags: tags.split(" ").filter(tag => tag.startsWith("#")),
        assets: [],
      }
      console.log(content)
      let submitBtn = document.getElementById("submitBtn");
      submitBtn.remove();
      const res = await backend.uploadTutorial(content)
      console.log("Tutorial Created?: ", res)
      const myForm = document.getElementById("form");
      if (myForm) {
        myForm.remove();
      };
      document.getElementById("h3").innerText = "Tutorial Ingresado con éxito y a la espera de ser aprobado";
    }
  }

  return (
    <div className="p-6 max-w-4xl min-h-[85vh] mx-auto">
      <h3 id="h3" className="font-bold text-4xl my-5">Crea tu primer tutorial</h3>
      <form id="form" onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-col">
          <div className="mb-3 flex flex-col">
            <label htmlFor="title" className="font-semibold text-2xl">
              Título del tutorial
            </label>
            <input
              className="border border-gray-300 rounded-lg active:border-gray-950 p-4 text-lg dark:bg-neutral-900 dark:border-gray-900"
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setTitle(e.target.value)
                }
              }}
            ></input>
            <span>{title.length}/100</span>
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="description" className="font-semibold text-2xl">
              Descripción del tutorial
            </label>
            <textarea
              className="border border-gray-300 rounded-lg active:border-gray-950 p-4 text-lg dark:bg-neutral-900 dark:border-gray-900"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 1000) {
                  setDescription(e.target.value);
                }
              }}
            ></textarea>
            <span>{description.length}/1000</span>
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="html" className="font-semibold text-2xl">
              Cuerpo del tutorial
            </label>
            <TextAreaMD setText={setHtml}></TextAreaMD>
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="tags" className="font-semibold text-2xl">
              Tags
            </label>
            <input
              className="border border-gray-300 rounded-lg active:border-gray-950 p-4 text-lg dark:bg-neutral-900 dark:border-gray-900"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value)
              }}
            ></input>
          </div>
        </div>
        <Button id = "submitBtn"
          primary
          type="submit"
          secondary={undefined}
          success={undefined}
          warning={undefined}
          danger={undefined}
          outline={undefined}
          rounded={undefined}
        >
          Guardar
        </Button>
      </form>
    </div>
  )
}

export { New }
