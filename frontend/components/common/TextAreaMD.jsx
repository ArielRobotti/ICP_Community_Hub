import React, { useState, useEffect } from "react"
import { useStackEdit } from "use-stackedit"
import Button from "../../components/common/Button"

const TextAreaMD = ({setText}) => {
  const [value, setValue] = useState("");
  const { openStackedit, onFileChange } = useStackEdit(setValue);

  useEffect(() => {
    if (value) {
      setText(value);
    };
  }, [value]);

  return (
    <div>
      <textarea
        value={value}
        className="border w-full border-gray-300 h-40 rounded-lg active:border-gray-950 p-4 dark:bg-neutral-900 dark:border-gray-900"
        onChange={(e) => {
          setValue(e.target.value)

          // If textarea is edited run the file change event on stackedit
          onFileChange()
        }}
      ></textarea>
      <button
        className="text-cyan-600 hover:text-cyan-500"
        onClick={() => {
          openStackedit({
            content: {
              // Markdown content.
              text: value,
              yamlProperties: {
                colorTheme: 'dark' // TODO: not working
              },
              properties: {
                colorTheme: 'dark' // TODO: not working
              }
            },
          }, true)
        }}
      >
        Open Editor
      </button>
    </div>
  )
}
export default TextAreaMD
