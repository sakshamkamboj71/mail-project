import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const Age = () => {
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");

  const [age, setAge] = useState("");
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };
  const handleCancel = () => {
    navigate("/account");
  };

  const handleSave = async () => {
    if (age > 100) {
      setMessage("Age cannot be greater than 100");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 1500);

      return;
    }

    await axios.post("http://localhost:8000/auth/update-age", {
      userID,
      age,
    });

    setMessage("Updated Age Successfully");
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      navigate("/account");
    }, 1500);
  };

  const toAccount = () => {
    navigate("/account");
  };
  return (
    <>
      {popup ? <Popup message={message} /> : <></>}

      <div className="pt-16 text-lg bg-blue-100 w-full h-screen enableScroll">
        <div className="p-4 px-80 xl:px-64 lg:px-40 md:px-24 sm:px-2 md:text-base sm:text-sm">
          <div
            className="fixed bg-blue-200 hover:bg-blue-300 text-lg p-2 rounded-full top-20 mt-2 left-2"
            onClick={toAccount}
          >
            <FaArrowLeft />
          </div>
          <h1 className="text-4xl text-center border-black border-b-2 mb-4 mt-4 sm:text-2xl sm:mt-12">
            Update Age
          </h1>
          <div className="">
            <input
              className="bg-blue-200 w-full outline-none p-4 rounded-md mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  border-gray-600 border-b-4 placeholder-gray-500"
              type="number"
              placeholder="Update Age"
              id="age"
              value={age}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <div
                onClick={handleCancel}
                className="p-4 sm:p-2 sm:w-16 w-24 text-center bg-blue-300 hover:bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={handleSave}
                className="p-4 sm:p-2 sm:w-16 w-24 text-center bg-[#e05f38] hover:bg-[#c74a24] text-white rounded-md cursor-pointer"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Age;
