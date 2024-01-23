import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mails from "../components/Mails";

const Draft = () => {
  const userID = window.localStorage.getItem("userID");

  const [mails, setMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    const response = await axios.post(
      "http://localhost:8000/mail/draft-mails",
      {
        userID,
      }
    );
    setMails(response.data);
  };

  const handleMail = (e) => {
    window.localStorage.setItem("key", e.currentTarget.id);
    const type = e.currentTarget.attributes.type.value;
    if (e.currentTarget.id && type === "sent") {
      navigate("/view-mail");
    } else if (e.currentTarget.id && type === "draft") {
      navigate("/draft-compose");
    }
  };
  return <Mails type="Draft" handleMail={handleMail} mails={mails} />;
};

export default Draft;
