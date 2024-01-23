import React from "react";

const Popup = (props) => {
  return (
    <div className="fixed justify-center items-center w-full h-screen bg-black/50">
      <div className="w-full h-screen flex items-center justify-center rounded-md">
        <div className="text-xl font-bold p-12 text-center bg-blue-200 relative bottom-16 rounded-md">
          {props.message}
        </div>
      </div>
    </div>
  );
};

export default Popup;
