import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const Verification = () => {
  const [verification, setVerification] = useState("");
  const [error, setError] = useState("");
  const userID = window.localStorage.getItem("userID");
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerification(e.target.value);
  };

  const handleSave = async () => {
    try {
      if (verification === "") {
        setError("Please fill out the input field");
        setMessage("Please fill out the input field");
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 1500);
        throw error;
      }

      const response = await axios.post("http://localhost:8000/auth/verify", {
        userID,
        verification,
      });

      setMessage(response.data.message);
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/account");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const toAccount = () => {
    navigate("/account");
  };
  return (
    <>
      {popup ? <Popup message={message} /> : <></>}

      <div className="pt-16 bg-blue-100 w-full h-screen text-lg enableScroll">
        <div className="p-8 sm:p-0 flex flex-col items-center">
          <div
            className="fixed bg-blue-200 hover:bg-blue-300 text-lg p-2 rounded-full top-20 mt-2 left-2 cursor-pointer"
            onClick={toAccount}
          >
            <FaArrowLeft />
          </div>
          <h1 className="text-center font-bold text-5xl pt-4 sm:text-2xl sm:mt-12">
            Verification
          </h1>
          <div className="p-4 bg-blue-100 mt-8 w-3/4 lg:w-full md:text-base sm:text-sm rounded-md">
            <h2 className="font-semibold">
              Steps for completing verification :
            </h2>
            <div className="bg-blue-200 p-4 sm:p-2 rounded-md">
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Go to manage
                your google account
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Navigate to
                the Security section
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Scroll down
                and find the 2-Step verification option
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Enable
                2-Step verification
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Go to 2-Step
                verification and Scroll down "App password" section
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Click on
                "App password"
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Enter any
                name for your password and click on "Create"
              </p>
              <p className="flex items-center sm:border-b-2 sm:border-black pt-2">
                <IoIosArrowForward className="text-lg sm:hidden" /> Enter the
                password generated and enjoy your verified account
              </p>
            </div>

            <h2 className="mt-8">Enter the generated password :</h2>
            <div className="w-full flex flex-col justify-center items-center">
              <input
                className="w-full p-2 rounded-md outline-none border-gray-600 border-b-4 placeholder-gray-500"
                type="text"
                placeholder="Enter App Password"
                value={verification}
                onChange={handleChange}
              />

              <div
                onClick={handleSave}
                className="p-2 w-52 sm:w-32 hover:bg-[#c74a24] bg-[#e05f38] text-white text-center mt-6 rounded-md cursor-pointer"
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

export default Verification;
