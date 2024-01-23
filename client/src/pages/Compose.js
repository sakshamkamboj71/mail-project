import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const Compose = () => {
  const userID = window.localStorage.getItem("userID");
  const [from, setFrom] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [verification, setVerification] = useState("");

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);
  const [imgUrl, setimgUrl] = useState("");
  const [imgName, setimgName] = useState("");

  useEffect(() => {
    fetchMail();
  }, []);

  const fetchMail = async () => {
    const response = await axios.post("http://localhost:8000/auth/get-user", {
      userID,
    });

    setFrom(response.data.email);
    setVerification(response.data.verification);
  };

  const handleSave = async () => {
    try {
      const type = "sent";

      if (to === null || to === undefined || to === "") {
        setMessage("Please enter the Sender's mail address");
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 2500);

        throw message;
      }

      if (subject.length > 40) {
        setMessage("Subject can be only 20 characters");
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 2500);

        throw message;
      }

      setPopup(true);
      setMessage("Sending mail. Please wait.");

      const mailResponse = await axios.post("http://localhost:8000/sendmail", {
        from,
        to,
        subject,
        text,
        verification,
        imgName,
        imgUrl,
      });

      setPopup(false);

      if (mailResponse.data.error && mailResponse.data.error === 404) {
        setMessage(mailResponse.data.message);

        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 2500);
        throw mailResponse.data.message;
      } else if (mailResponse.data.error && mailResponse.data.error === 403) {
        setMessage(mailResponse.data.message);

        setPopup(true);
        setTimeout(() => {
          setPopup(false);
          navigate("/verification");
        }, 2500);
        throw mailResponse.data.message;
      }

      const findDate = new Date();

      const date =
        findDate.getDate() +
        "-" +
        (findDate.getMonth() + 1) +
        "-" +
        findDate.getFullYear();

      const response = await axios.post("http://localhost:8000/mail/compose", {
        userID,
        to,
        from,
        subject,
        text,
        type,
        imgName,
        imgUrl,
        date,
      });

      if (response.data.error) {
        setMessage(response.data.message);

        setPopup(true);
        setTimeout(() => {
          setPopup(false);
        }, 2500);
        setError(true);
        throw response.data.message;
      }

      setMessage(response.data.message);

      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async () => {
    try {
      const findDate = new Date();

      const date =
        findDate.getDate() +
        "-" +
        (findDate.getMonth() + 1) +
        "-" +
        findDate.getFullYear();
      const type = "draft";
      const response = await axios.post("http://localhost:8000/mail/compose", {
        userID,
        to,
        from,
        subject,
        text,
        type,
        imgName,
        imgUrl,
        date,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
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
          setimgUrl(downloadURL);
          setPopup(false);
          setimgName(e.target.files[0].name);
        });
      });
    } else {
      console.log("No file is selected, so select one.");
    }
  };

  return (
    <>
      {popup ? <Popup message={message} /> : <></>}
      <div className="compose-boss w-full pt-4 p-4 sm:p-2 enableScroll bg-blue-100">
        <div className="compose-container text-lg px-24 lg:px-4 md:px-2 sm:px-0 md:text-base">
          <h1 className="text-center text-5xl border-black border-b-2 pb-3 mb-8 md:pb-4 md:text-3xl md:mt-5 sm:text-3xl font-semibold">
            Compose your mail
          </h1>

          <p className="pb-3 truncate">From: {from}</p>
          <label htmlFor="to" className=" ">
            To :
          </label>
          <input
            className="w-full p-3 mb-3 outline-none bg-blue-200 block w-full border-b-4 border-gray-600 rounded-md placeholder-gray-500"
            type="email"
            placeholder="Enter Reciever's mail"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={error ? { border: "4px solid red" } : {}}
          />

          <label htmlFor="subject">Subject :</label>
          <input
            className="w-full p-3 mb-3 outline-none bg-blue-200 block w-full border-b-4 border-gray-600 rounded-md placeholder-gray-500"
            type="text"
            placeholder="Enter Subject"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label htmlFor="body">Body :</label>
          <textarea
            className="w-full h-64 p-3 mb-3 outline-none bg-blue-200 block w-full border-b-4 border-gray-600 rounded-md resize-none placeholder-gray-500"
            id="body"
            placeholder="Enter Body text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <label htmlFor="file">Attachment : </label>
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
            />
          </div>

          <p>File URL</p>
          <div className="flex justify-center sm:block border-black border-2 h-8 w-full">
            <div className="relative justify-center items-center overflow-hidden">
              <div className="flex items-center whitespace-nowrap overflow-hidden ">
                {imgUrl}
              </div>
            </div>
          </div>

          <Link
            className="bg-[#e05f38] hover:bg-[#c74a24] flex text-center w-20 mb-8 justify-center p-2 rounded-b-md text-white cursor-pointer cursor-pointer"
            to={imgUrl}
            target="_blank"
          >
            View
          </Link>

          <div className="flex justify-between">
            <div
              className="p-4 w-24 text-center bg-blue-300 hover:bg-gray-300 rounded-md md:p-2 sm:w-20 cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </div>
            <div
              className="p-4 w-24 text-center bg-[#e05f38] hover:bg-[#c74a24] text-white rounded-md md:p-2 sm:w-20 cursor-pointer"
              onClick={handleSave}
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compose;
