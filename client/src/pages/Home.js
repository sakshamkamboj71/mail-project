import React from "react";
import { FaPen } from "react-icons/fa";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { MdDelete, MdDrafts, MdMail, MdOutlineStar } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-boss flex h-screen pt-14 select-none">
      <div className="home-container w-52 bg-blue-50 lg:hidden">
        <div
          className=" bg-[#e05f38] hover:bg-[#c74a24] text-white pt-4 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
          onClick={() => navigate("/compose")}
        >
          Compose
          <div className="">
            <FaPen className="" />
          </div>
        </div>
        <div
          className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          All Mails{" "}
          <div className="">
            <MdMail className="" />
          </div>
        </div>
        <div
          className="hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
          onClick={() => navigate("/starred")}
        >
          Starred{" "}
          <div className="">
            <MdOutlineStar className="" />
          </div>
        </div>
        <div
          className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
          onClick={() => navigate("/sent")}
        >
          Sent{" "}
          <div className="">
            <HiMiniPaperAirplane className="" />
          </div>
        </div>
        <div
          className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
          onClick={() => navigate("/drafts")}
        >
          Drafts{" "}
          <div className="">
            <MdDrafts className="" />
          </div>
        </div>
        <div
          className="hover:hover:bg-blue-100 flex p-2 px-4 justify-between items-center text-lg cursor-pointer"
          onClick={() => navigate("/bin")}
        >
          Bin{" "}
          <div className="">
            <MdDelete className="" />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
