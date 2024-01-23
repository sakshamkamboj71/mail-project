import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mails from "../components/Mails";

const Sent = () => {
  const userID = window.localStorage.getItem("userID");

  const [mails, setMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    const response = await axios.post("http://localhost:8000/mail/sent-mails", {
      userID,
    });
    setMails(response.data);
  };

  const handleMail = (e) => {
    window.localStorage.setItem("key", e.currentTarget.id);
    navigate("/view-mail");
  };
  return <Mails type="Sent" handleMail={handleMail} mails={mails} />;
};

export default Sent;
