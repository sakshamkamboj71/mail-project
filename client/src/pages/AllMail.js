import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Mails from "../components/Mails";

const AllMail = () => {
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();

  const [mails, setMails] = useState([]);

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    const response = await axios.post("http://localhost:8000/mail/all", {
      userID,
    });
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

    // setTimeout(() => {
    // }, 1000);
  };

  return (
    <>
      <Mails type="All" handleMail={handleMail} mails={mails} />
      <Outlet />
    </>
  );
};

export default AllMail;
