import React from "react";

function Clmtooltipbtn({ onClick }) {
  return (
    <div className="dotbtn" onClick={onClick} >
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

export default Clmtooltipbtn;
