import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const UpdatePhone = () => {
  const [updphone, setUpdphone] = useState();
  const userID = window.localStorage.getItem("userID");

  const [error, setError] = useState("");

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/account");
  };

  const handleChange = (e) => {
    setUpdphone(e.target.value);
  };

  const handleSave = async () => {
    try {
      if (updphone === undefined) {
        setError("Please enter a phone number");
        throw error;
      }
      const phlen = updphone.length === 10;

      if (!phlen) {
        setError("Invalid Phone Number");
        throw error;
      }

      const response = await axios.post(
        "http://localhost:8000/auth/update-phone",
        {
          userID,
          updphone,
        }
      );

      setMessage("Phone Number Updated successfully");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/account");
      }, 1500);
    } catch (err) {
      console.error(err);
    }
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
            className="fixed bg-blue-200 hover:bg-blue-300 text-lg p-2 rounded-full top-20 mt-2 left-2 cursor-pointer"
            onClick={toAccount}
          >
            <FaArrowLeft />
          </div>
          <h1 className="text-4xl text-center border-black border-b-2 mb-4 mt-4 sm:text-2xl sm:mt-12">
            Update Phone Number
          </h1>
          <div className="">
            <input
              className="bg-blue-200 w-full outline-none p-4 rounded-md mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  border-gray-600 border-b-4 placeholder-gray-500"
              type="number"
              placeholder="Update Phone Number"
              id="phone"
              value={updphone}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <div
                className="p-4 w-24 text-center bg-blue-300 hover:bg-gray-300 rounded-md md:p-2 sm:w-20 cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </div>

              <div
                className="p-4 w-24 sm:p-2 sm:w-16 text-center bg-[#e05f38] hover:bg-[#c74a24] text-white rounded-md cursor-pointer"
                onClick={handleSave}
              >
                Save
              </div>
            </div>
          </div>
        </div>
        <div
          style={error ? { display: "flex" } : { display: "none" }}
          className="w-full flex justify-center items-center"
        >
          <div className="p-2 bg-red-300 text-center rounded-md mt-8 md:text-sm">
            *{error}*
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePhone;
