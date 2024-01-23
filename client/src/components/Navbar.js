import axios from "axios";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { FaStarOfLife } from "react-icons/fa6";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { MdDelete, MdDrafts, MdMail, MdOutlineStar } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isUserLoggedIn = !!window.localStorage.getItem("token");
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");
  const [verification, setVerification] = useState();
  const [toggle, setToggle] = useState(false);

  const [pic, setPic] = useState("");

  const fetchUser = async () => {
    const response = await axios.post("http://localhost:8000/auth/get-user", {
      userID,
    });

    const image = response.data?.pic;
    if (image === undefined || image === "") {
      setPic(
        "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
      );
    } else {
      setPic(image);
    }

    setVerification(response.data?.verification);
  };

  fetchUser();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("key");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex w-full bg-blue-50 text-black justify-between items-center select-none h-16 z-50 fixed">
      <div className="flex justify-center text-3xl items-center gap-5 w-60 h-full md:gap-2 md:w-auto">
        <div
          className="w-16 h-16 flex justify-center items-center cursor-pointer hover:bg-gray-300 hidden lg:flex"
          onClick={() => setToggle(!toggle)}
        >
          <TiThMenu className="text-2xl" />
        </div>
        <div
          className="cursor-pointer font-semibold"
          onClick={() => navigate("/")}
        >
          F-Mail
        </div>

        <div className="w-12 h-12 flex items-center border-2 border-black rounded-full md:hidden">
          <img
            src={pic}
            alt="N/A"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      {isUserLoggedIn ? (
        <div className="flex items-center">
          {!verification && (
            <div className="w-auto h-16  flex justify-center items-center font-bold text-[#e05f38] px-2">
              <FaStarOfLife />
              Account not verified <FaStarOfLife />
            </div>
          )}

          <div
            className="w-16 h-16  flex justify-center items-center cursor-pointer hover:bg-gray-300 md:hidden"
            onClick={() => navigate("/")}
          >
            <AiFillHome className="text-xl" />
          </div>
          <div
            className="w-24 h-16 flex justify-center items-center cursor-pointer hover:bg-gray-300 text-lg lg:hidden"
            onClick={() => navigate("/account")}
          >
            Account
          </div>
          <div
            className="w-24 h-16 flex justify-center items-center cursor-pointer hover:bg-[#c74a24] bg-[#e05f38] text-lg text-white sm:hidden"
            onClick={handleLogout}
          >
            {" "}
            Logout
          </div>
        </div>
      ) : (
        <div className="">
          <div className="">
            <img
              src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="N/A"
            />
          </div>

          <div className="" onClick={() => navigate("/login")}>
            Login
          </div>
          <div className="" onClick={() => navigate("/register")}>
            Register
          </div>
        </div>
      )}

      {toggle ? (
        <div className="fixed top-16 left-[-100%] bg-blue-50 h-screen w-full enableScroll p-4 lg:left-0 lg:w-1/2 sm:w-full z-50">
          <div className="flex">
            <div
              onClick={() => {
                navigate("/account");
                setToggle(false);
              }}
              className="w-16 h-16 flex justify-center items-center cursor-pointer hover:bg-gray-300 hidden xl:flex"
            >
              <VscAccount className="text-4xl" />
            </div>
            <div className="w-12 m-2 h-12 flex items-center border-2 border-black rounded-full hidden md:flex">
              <img
                src={pic}
                alt="N/A"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div
            className=" bg-[#e05f38] hover:bg-[#c74a24] text-white pt-4 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
            onClick={() => {
              navigate("/compose");
              setToggle(false);
            }}
          >
            Compose
            <div className="">
              <FaPen className="" />
            </div>
          </div>
          <div
            className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
            onClick={() => {
              navigate("/");
              setToggle(false);
            }}
          >
            All Mails{" "}
            <div className="">
              <MdMail className="" />
            </div>
          </div>
          <div
            className="hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
            onClick={() => {
              navigate("/starred");
              setToggle(false);
            }}
          >
            Starred{" "}
            <div className="">
              <MdOutlineStar className="" />
            </div>
          </div>
          <div
            className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
            onClick={() => {
              navigate("/sent");
              setToggle(false);
            }}
          >
            Sent{" "}
            <div className="">
              <HiMiniPaperAirplane className="" />
            </div>
          </div>
          <div
            className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
            onClick={() => {
              navigate("/drafts");
              setToggle(false);
            }}
          >
            Drafts{" "}
            <div className="">
              <MdDrafts className="" />
            </div>
          </div>
          <div
            className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
            onClick={() => {
              navigate("/bin");
              setToggle(false);
            }}
          >
            Bin{" "}
            <div className="">
              <MdDelete className="" />
            </div>
          </div>

          <div
            className="p-2 flex justify-center items-center cursor-pointer hover:bg-[#c74a24] bg-[#e05f38] text-lg text-white fixed left-[-100%] bottom-4 w-40 sm:left-4 rounded-md"
            onClick={handleLogout}
          >
            {" "}
            Logout
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
