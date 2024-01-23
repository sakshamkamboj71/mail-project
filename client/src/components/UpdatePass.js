import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft, FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const UpdatePass = () => {
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  const [toggleOld, settoggleOld] = useState(false);
  const [toggleNew, settoggleNew] = useState(false);
  const [toggleConfirm, settoggleConfirm] = useState(false);

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const userID = window.localStorage.getItem("userID");

  const handleSave = async () => {
    const response = await axios.post(
      "http://localhost:8000/auth/update-pass",
      {
        userID,
        oldpass,
        newpass,
        confirmpass,
      }
    );

    try {
      if (response.data.message !== undefined) {
        setError(response.data.message);
        throw response.data.message;
      }
      setMessage("Password updated successfully");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/account");
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/account");
  };

  const toAccount = () => {
    navigate("/account");
  };

  const [error, setError] = useState("");
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
            Update Password
          </h1>
          <div className="">
            <label className="px-2" htmlFor="oldpass">
              Enter Old Password
            </label>
            <div className="flex h-16 w-full outline-none rounded-lg mb-4 border-gray-600 border-b-4 ">
              <input
                className="h-full rounded-l-md w-11/12 outline-none placeholder-gray-500 px-4 bg-blue-200"
                type={toggleOld ? "text" : "password"}
                placeholder="Enter Old Password"
                id="oldpass"
                value={oldpass}
                onChange={(e) => setOldpass(e.target.value)}
              />
              <div
                onClick={() => settoggleOld(!toggleOld)}
                className="w-1/12 md:w-12 bg-[#e05f38] rounded-r-md cursor-pointer flex items-center justify-center text-2xl text-white hover:bg-[#c74a24]"
              >
                {toggleOld ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <label className="px-2" htmlFor="newpass">
              Enter New Password
            </label>
            <div className="flex h-16 w-full outline-none rounded-lg mb-4 border-gray-600 border-b-4 ">
              <input
                className="h-full rounded-l-md w-11/12 outline-none placeholder-gray-500 px-4 bg-blue-200"
                type={toggleNew ? "text" : "password"}
                placeholder="Enter New Password"
                id="oldpass"
                value={newpass}
                onChange={(e) => setNewpass(e.target.value)}
              />
              <div
                onClick={() => settoggleNew(!toggleNew)}
                className="w-1/12 md:w-12 bg-[#e05f38] rounded-r-md cursor-pointer flex items-center justify-center text-2xl text-white hover:bg-[#c74a24]"
              >
                {toggleNew ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <label className="px-2" htmlFor="confirmpass">
              Confirm New Password
            </label>
            <div className="flex h-16 w-full outline-none rounded-lg mb-4 border-gray-600 border-b-4 ">
              <input
                className="h-full rounded-l-md w-11/12 outline-none placeholder-gray-500 px-4 bg-blue-200"
                type={toggleConfirm ? "text" : "password"}
                placeholder="Confirm new Password"
                id="oldpass"
                value={confirmpass}
                onChange={(e) => setConfirmpass(e.target.value)}
              />
              <div
                onClick={() => settoggleConfirm(!toggleConfirm)}
                className="w-1/12 md:w-12 bg-[#e05f38] rounded-r-md cursor-pointer flex items-center justify-center text-2xl text-white hover:bg-[#c74a24]"
              >
                {toggleConfirm ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <div
                className="p-4 w-24 sm:p-2 sm:w-16 text-center bg-blue-300 hover:bg-gray-300 rounded-md cursor-pointer"
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

export default UpdatePass;
