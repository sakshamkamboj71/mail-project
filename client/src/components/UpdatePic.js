import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Popup from "../components/Popup";

const UpdatePic = () => {
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");

  const [updpic, setPic] = useState("");
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPic(e.target.value);
  };
  const handleCancel = () => {
    navigate("/account");
  };

  const handleSave = async () => {
    await axios.post("http://localhost:8000/auth/update-pic", {
      userID,
      updpic,
    });

    setMessage("Updated Profile Pic Successfully");
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
      navigate("/account");
    }, 1500);
  };

  const toAccount = () => {
    navigate("/account");
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setMessage("Uploading");
    setPopup(true);
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setPic(downloadURL);
          setPopup(false);
        });
      });
    } else {
      console.log("No file is selected, so select one.");
    }
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
            Update Profile Pic
          </h1>
          <div className="">
            <input
              className="bg-blue-200 w-full outline-none p-4 rounded-md mb-4  border-gray-600 border-b-4 placeholder-gray-500"
              type="text"
              placeholder="Enter Image Url"
              id="pic"
              value={updpic}
              onChange={handleChange}
            />

            <h2 className="text-center text-3xl my-5 font-bold">OR</h2>

            <label htmlFor="file">Upload any file from your system : </label>
            <div className="bg-blue-200 rounded-lg mb-8 truncate border-b-4 border-gray-600">
              <input
                type="file"
                id="file"
                className="text-stone-500
              file:mr-5 file:py-1 file:px-3 file:font-medium
              file:bg-[#e05f38] file:text-white
              hover:file:cursor-pointer hover:file:bg-[#c74a24]
               file:rounded-l-md file:outline-none file:border-none file:py-2"
                onChange={handleFileUpload}
                accept="image/*"
              />
            </div>

            <div className="flex justify-between">
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
      </div>
    </>
  );
};

export default UpdatePic;
