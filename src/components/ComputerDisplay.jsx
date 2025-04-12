import React from "react";
import computerImg from "../assets/Computer.png"; // Make sure image is placed correctly

const ComputerDisplay = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <img
        src={computerImg}
        alt="Pixel Art Computer"
        className="h-[500px] drop-shadow-xl"
      />
    </div>
  );
};

export default ComputerDisplay;
