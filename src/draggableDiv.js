import React from "react";

export const DraggableDiv = ({ click, x, y }) => {

  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        background: "red",
        position: "fixed",
        left: `${x && click ? x : 0}px`,
        top: `${y && click ? y : 0}px`,
        cursor: "move",
      }}
    ></div>
  );
};

export default DraggableDiv;
