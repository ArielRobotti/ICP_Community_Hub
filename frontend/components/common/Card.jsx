import React, { useState } from "react";

const Card = ({ title, description, author, readTime, onClick, footer }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyles = {
    border: "1px solid #ccc",
    backgroundColor: isHovered ? "#101016" : "#202025", // Fondo oscuro al pasar el cursor
    color: "#fff", // Color del texto
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.3s ease",
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    overflow: "hidden", // Evitar desbordamiento de texto
  };

  const descriptionStyles = {
    // maxHeight: "400px", // Altura máxima para la descripción
    minHeight: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis", // Mostrar puntos suspensivos si hay desbordamiento
  };
  const readTimeStyles = {
    position: "absolute",
    bottom: "10px", // Ajusta la distancia desde la parte inferior según sea necesario
    right: "10px", // Ajusta la distancia desde la derecha según sea necesario
    color: "rgba(255, 255, 255, 0.7)", // Color del tiempo de lectura
  };

  return (
    <div
      className="w-full lg:max-w-full lg:flex card"
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <div className="text-gray-100 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-300 text-base" style={descriptionStyles}>
          {description}
        </p>
      </div>
      <div className="flex items-center">
        <div className="text-sm">
          <p className="text-gray-300 leading-none">{author}</p>
          <p className="text-gray-300" style={readTimeStyles}>{readTime} mins</p>
        </div>
      </div>
      {footer}
    </div>
  );
};

export default Card;
