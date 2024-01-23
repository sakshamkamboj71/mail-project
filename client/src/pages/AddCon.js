import React from "react";

const AddCon = (props) => {
  return (
    <div className="fixed justify-center items-center w-full h-screen bg-black/50">
      <div className="w-full h-screen flex items-center justify-center rounded-md">
        <div className="text-lg p-12 md:p-4 md:pt-8 text-center bg-blue-100 w-3/4 md:w-full md:text-base relative bottom-12 rounded-md">
          <h1 className="text-4xl md:text-3xl border-black border-b-2 mb-2">
            Add another Contact
          </h1>

          <input
            className="bg-blue-200 w-full outline-none p-4 rounded-md mb-4 border-gray-600 border-b-4 placeholder-gray-500"
            type="text"
            placeholder="Add Nickname"
            value={props.nickname}
            onChange={(e) => props.setNickname(e.target.value)}
          />

          <input
            className="bg-blue-200 w-full outline-none p-4 rounded-md mb-4 border-gray-600 border-b-4 placeholder-gray-500"
            type="email"
            placeholder="Add E-Mail"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />

          <div className="flex justify-center">
            <div
              onClick={props.handleContact}
              className="p-2 text-white w-40 cursor-pointer rounded-md bg-[#e05f38] hover:bg-[#c74a24]"
            >
              Save
            </div>
          </div>
          <div
            style={props.error ? { display: "flex" } : { display: "none" }}
            className="w-full flex justify-center items-center"
          >
            <div className="p-2 bg-red-300 text-center rounded-md mt-8 md:text-sm">
              *{props.error}*
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCon;
