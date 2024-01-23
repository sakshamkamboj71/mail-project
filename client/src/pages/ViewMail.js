import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const ViewMail = () => {
  const mailID = window.localStorage.getItem("key");
  useEffect(() => {
    fetchMail();
  }, []);

  const navigate = useNavigate();

  const [starred, setStarred] = useState();
  const [bin, setBin] = useState();

  const [mail, setMail] = useState({});
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fetchMail = async () => {
    const response = await axios.post("http://localhost:8000/mail/single", {
      mailID,
    });

    setStarred(response.data[0].starred);
    setBin(response.data[0].bin);

    // console.log(response.data[0]);

    setMail(response.data[0]);
  };

  const handleStar = async () => {
    setStarred(!starred);
    const star = !starred;

    const response = await axios.post("http://localhost:8000/mail/star", {
      star,
      mailID,
    });
    window.location.reload();
  };

  const handleDel = async () => {
    if (bin === false) {
      const binval = true;
      const response = await axios.post("http://localhost:8000/mail/bin", {
        binval,
        mailID,
      });

      setMessage("Mail sent to the bin");

      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/bin");
      }, 2000);
    } else if (bin === true) {
      const response = await axios.post("http://localhost:8000/mail/delete", {
        mailID,
      });

      setMessage("Mail successfully deleted");
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      {popup ? <Popup message={message} /> : <></>}

      <div className="view-boss w-full p-4 text-lg sm:text-base enableScroll bg-blue-100 enableScroll">
        <div className="view-container">
          <div className=" flex justify-between">
            <div>
              <div
                className={
                  bin
                    ? "text-blue-100 select-none"
                    : "text-[#e05f38] flex p-4 text-2xl gap-8"
                }
                onClick={handleStar}
              >
                {starred ? (
                  <MdOutlineStar className=" cursor-pointer" />
                ) : (
                  <MdOutlineStarBorder className="cursor-pointer" />
                )}
              </div>
            </div>

            <div
              className="p-4 text-2xl rounded-full bg-[#e05f38] text-white cursor-pointer"
              onClick={handleDel}
            >
              <MdDelete />
            </div>
          </div>
          <h1 className="text-4xl font-semibold mt-4 border-black border-t-2 sm:text-3xl pb-3 flex justify-between sm:block break-words">
            {mail.subject}{" "}
            <span className="text-lg font-semibold block w-64 text-right sm:text-left sm:mt-1 sm:border-black sm:border-t-2">
              {mail.date}
            </span>
          </h1>
          <p className="mb-3 border-black border-b-2 break-words">
            From : {mail.from}
          </p>
          <p className="mb-3 border-black border-b-2 break-words">
            To : {mail.to}
          </p>
          <div className="block min-h-80 bg-blue-200 rounded-md mb-4">
            <p className=" p-4 w-full break-words">{mail.text} </p>
          </div>

          {mail.imgName ? (
            <Link
              className="bg-[#e05f38] hover:bg-[#c74a24] flex text-center w-52 sm:w-24 sm:text-sm mb-8 justify-center p-2 rounded-md text-white cursor-pointer cursor-pointer"
              to={mail.imgUrl}
              target="_blank"
            >
              View Attachment
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewMail;
