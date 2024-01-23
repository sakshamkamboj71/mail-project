import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState();
  const [verification, setVerification] = useState();
  const [verStatus, setvarStatus] = useState(false);

  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await axios.post("http://localhost:8000/auth/get-user", {
      userID,
    });
    setUsername(response.data.username);
    setEmail(response.data.email);
    setPhone(response.data.phone);
    setAge(response.data.age);
    setVerification(response.data.verification);

    if (response.data.verification) {
      setvarStatus(true);
    }
  };

  const navigateUser = () => {
    navigate("/update-user");
  };

  const navigatePass = () => {
    navigate("/update-pass");
  };

  const navigatePhone = () => {
    navigate("/update-phone");
  };

  const navigatePic = () => {
    navigate("/update-pic");
  };
  const navigateVar = () => {
    navigate("/verification");
  };
  const navigateAge = () => {
    navigate("/update-age");
  };
  const navigateContact = () => {
    navigate("/contacts");
  };
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="pt-16 bg-blue-100 w-full h-screen enableScroll">
      <div className="p-4 pt-12 px-96 text-lg xl:px-64 lg:px-40 md:px-24 sm:px-0 md:text-base sm:text-sm">
        <div
          className="fixed bg-blue-200 hover:bg-blue-300 text-lg p-2 rounded-full top-20 mt-2 left-2 cursor-pointer"
          onClick={navigateHome}
        >
          <FaArrowLeft />
        </div>
        <h1 className="text-4xl text-center border-black border-b-2 mb-4 sm:mt-4">
          Account Details
        </h1>
        <div className="bg-blue-200 pl-4 flex justify-between items-center h-12 ">
          Username: {username}{" "}
          <div
            className="hover:bg-[#c74a24] bg-[#e05f38] w-20 flex justify-center h-full items-center cursor-pointer text-white sm:w-14"
            onClick={navigateUser}
          >
            Edit
          </div>
        </div>
        <div className="bg-blue-200 pl-4 flex justify-between items-center h-12 truncate">
          Email: {email}
        </div>
        <div className="bg-blue-200 pl-4 flex justify-between items-center h-12">
          Phone Number: {phone}{" "}
          <div
            className="hover:bg-[#c74a24] bg-[#e05f38] w-20 flex justify-center h-full items-center cursor-pointer text-white sm:w-14"
            onClick={navigatePhone}
          >
            Edit
          </div>
        </div>
        <div className="bg-blue-200 pl-4 flex justify-between items-center h-12">
          Age: {age}{" "}
          <div
            className="hover:bg-[#c74a24] bg-[#e05f38] w-20 flex justify-center h-full items-center cursor-pointer text-white sm:w-14"
            onClick={navigateAge}
          >
            Edit
          </div>
        </div>
        <div
          className="hover:bg-[#e05f38] bg-blue-200 hover:text-white pl-4 flex justify-between items-center h-12 cursor-pointer transition duration-100"
          onClick={navigatePass}
        >
          Update Password
        </div>
        <div
          className="hover:bg-[#e05f38] bg-blue-200 hover:text-white pl-4 flex justify-between items-center h-12 cursor-pointer transition duration-100"
          onClick={navigatePic}
        >
          Update Profile Picture
        </div>
        {verification ? (
          <div
            className="hover:bg-[#e05f38] bg-blue-200 hover:text-white pl-4 flex items-center h-12 cursor-pointer transition duration-100"
            onClick={navigateVar}
          >
            Update Verification{" "}
            <div className=" w-20 flex justify-center h-full items-center cursor-pointer text-green-800 text-4xl">
              <BsPatchCheckFill />
            </div>{" "}
          </div>
        ) : (
          <div
            className="hover:bg-[#c74a24] bg-[#e05f38] text-white hover:text-white pl-4 flex  items-center h-12 cursor-pointer transition duration-100"
            onClick={navigateVar}
          >
            Complete Verification{" "}
            <div className=" w-20 flex justify-center h-full items-center cursor-pointer text-white-800 text-4xl">
              <FaExclamationCircle />
            </div>{" "}
          </div>
        )}
        <div
          className="hover:bg-[#e05f38] bg-blue-200 hover:text-white pl-4 flex justify-between items-center h-12 cursor-pointer transition duration-100"
          onClick={navigateContact}
        >
          View Contacts
        </div>
      </div>
    </div>
  );
};

export default Account;
