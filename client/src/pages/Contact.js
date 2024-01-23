import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import AddCon from "./AddCon";

const Contact = () => {
  const userID = window.localStorage.getItem("userID");

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.post("http://localhost:8000/contact/all", {
      userID,
    });

    setContacts(response.data);
  };

  const showPop = () => {
    setMessage("This is the message");
    setPopup(!popup);
  };

  const handleContact = async () => {
    if (nickname.length < 3) {
      setError("Please Enter a nickname of atleast 3 characters");
      return;
    } else if (nickname.length > 40) {
      setError("Nickname cannot be more than 20 characters");
      return;
    } else if (email.length === 0) {
      setError("Please enter an e-mail");
      return;
    } else if (email.length > 40) {
      setError("E-mail cannot be more than 20 characters");
      return;
    }

    const response = await axios.post("http://localhost:8000/contact/add", {
      nickname,
      email,
      userID,
    });

    window.location.reload();

    setPopup(false);
  };

  const handleDel = async (e) => {
    const _id = e.currentTarget.id;

    const response = await axios.post("http://localhost:8000/contact/del", {
      _id,
    });

    window.location.reload();
  };

  const navigateAcc = () => {
    navigate("/account");
  };

  return (
    <>
      {popup ? (
        <AddCon
          message={message}
          nickname={nickname}
          setNickname={setNickname}
          email={email}
          setEmail={setEmail}
          error={error}
          setError={setError}
          handleContact={handleContact}
        />
      ) : (
        <></>
      )}

      <div className="pt-16 w-full h-screen text-lg flex justify-center bg-blue-100 enableScroll">
        <div className="p-4 sm:p-2 w-3/4 lg:w-full">
          <div
            className="fixed bg-blue-200 hover:bg-blue-300 text-lg p-2 rounded-full top-20 mt-2 left-2 cursor-pointer"
            onClick={navigateAcc}
          >
            <FaArrowLeft />
          </div>
          <h1 className="text-5xl sm:text-4xl font-semibold text-center border-black border-b-2 sm:mt-16 ">
            Contacts
          </h1>
          <div
            onClick={showPop}
            className="absolute right-8 top-20 text-white p-2 text-center rounded-full text-2xl cursor-pointer bg-[#e05f38] hover:bg-[#c74a24]"
          >
            {popup ? <ImCross /> : <FaPlus />}
          </div>

          <div className=" pb-12">
            {contacts.map((contact) => {
              return (
                <div
                  key={contact._id}
                  className="border-black border-b-2 hover:bg-blue-200 h-full cursor-pointer flex justify-between select-none md:block md:text-base"
                >
                  <div className="flex sm:block items-center">
                    <div className="w-96 xl:w-80 sm:w-full truncate">
                      <span className="font-semibold">Nickname:</span>{" "}
                      {contact.nickname}
                    </div>
                    <div className="w-96 xl:w-80 sm:w-full truncate pl-4 sm:pl-0">
                      {contact.email}
                    </div>
                  </div>

                  <div
                    onClick={handleDel}
                    id={contact._id}
                    className="text-white p-2 w-20 text-center md:rounded-t-md bg-[#e05f38] hover:bg-[#c74a24]"
                  >
                    Delete
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
