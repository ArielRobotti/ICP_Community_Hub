import React from "react"

const Card = ({ title, description, author, readTime, onClick, footer }) => {
  return (
    <div className="w-full lg:max-w-full lg:flex" onClick={onClick}>
      <div className="border border-gray-400  bg-white dark:bg-black rounded-lg p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{author}</p>
            <p className="text-gray-600">{readTime} hours</p>
          </div>
        </div>
        {footer}
      </div>
    </div>
  )
}

export default Card
