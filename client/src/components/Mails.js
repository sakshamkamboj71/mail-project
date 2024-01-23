import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

const Mails = (props) => {
  const [searchText, setsearchText] = useState();

  const handleSearch = (e) => {
    setsearchText(e.target.value);
  };

  const filteredItems = props.mails.filter((mail) => {
    const searchString =
      searchText === undefined ? "" : searchText.toLowerCase();
    return mail.subject.toLowerCase().includes(searchString);
  });

  return (
    <div className="all-boss w-full p-4 sm:px-1 bg-blue-100 enableScroll">
      <div className="all-container text-lg lg:text-base md:text-sm">
        <h1 className="text-center text-5xl sm:text-4xl pt-2 mt-4 font-semibold">
          {props.type} Mails
        </h1>

        <input
          className=" border-black border-b-2 w-full p-3 outline-none placeholder-gray-500 rounded-t-md"
          placeholder="Search for you email here"
          type="text"
          value={searchText}
          onChange={handleSearch}
          autoComplete="off"
        />
        {filteredItems.length === 0 ? (
          <div className="text-center p-2 text-xl sm:text-base">
            No mails found
          </div>
        ) : (
          <></>
        )}
        {filteredItems.reverse().map((mail) => {
          return (
            <div
              id={mail._id}
              key={mail._id}
              type={mail.type}
              className="flex justify-between w-full border-b-2 border-black p-2 hover:bg-blue-200 cursor-pointer md:block truncate"
              onClick={props.handleMail}
            >
              <div className="w-[450px] truncate flex items-center gap-2">
                <span className="font-semibold">Subject :</span> {mail.subject}{" "}
                {mail.type === "draft" ? (
                  <FaPen className="text-[#e05f38]" />
                ) : (
                  <></>
                )}
                {mail.bin === true ? (
                  <RiDeleteBin7Fill className="text-[#e05f38]" />
                ) : (
                  <></>
                )}
              </div>
              <div className="w-[450px] pl-4 md:pl-0 text-right md:text-left">
                <span className="md:hidden">|</span>{" "}
                <span className="font-semibold">To :</span> {mail.to}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mails;
