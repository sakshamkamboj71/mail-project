import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
      });

      if (response.data.code) {
        setError(response.data.message);
        console.log(response.data.message);
      } else {
        setUsername("");
        setPassword("");
        setEmail("");
        setError("");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-blue-50 w-full h-screen p-4 sm:px-2 text-lg md:text-base text-lg flex flex-col items-center">
      <h1 className="text-5xl md:text-4xl text-center font-bold py-8">
        Register
      </h1>
      <form
        className="bg-blue-100 w-1/2 lg:w-3/4 md:w-full h-auto flex flex-col justify-center items-center p-4 md:p-2 sm:p-1 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="w-full p-4 md:px-2 h-full">
          <label htmlFor="username">Username</label>
          <input
            className="w-full p-2 rounded-md outline-none border-gray-600 border-b-4 placeholder-gray-500"
            type="text"
            id="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="w-full p-4 md:px-2 h-full">
          <label htmlFor="email">E-mail</label>
          <input
            className="w-full p-2 rounded-md outline-none border-gray-600 border-b-4 placeholder-gray-500"
            type="text"
            id="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="w-full p-4 md:px-2 h-full">
          <label htmlFor="password">Password</label>
          <input
            className="w-full p-2 rounded-md outline-none border-gray-600 border-b-4 placeholder-gray-500"
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="hover:bg-[#c74a24] bg-[#e05f38] text-white p-2 w-40 md:w-32 md:text-base  rounded-md mt-4 mb-4"
        >
          Submit
        </button>

        <div className="flex w-full px-6 justify-between text-black md:text-sm md:px-2 text-center">
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:text-[#e05f38] px-1"
          >
            Already a user?
          </div>
        </div>
      </form>

      <div
        style={error ? { display: "flex" } : { display: "none" }}
        className="w-full flex justify-center items-center"
      >
        <div className="p-2 bg-red-300 text-center rounded-md mt-8">
          *{error}*
        </div>
      </div>
    </div>
  );
};

export default Register;
