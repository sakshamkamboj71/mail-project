import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate("/");
  return (
    <div className="pt-16 text-lg">
      <div className="p-12 sm:p-4">
        <h1 className="text-6xl font-bold sm:text-4xl">Error : 404</h1>
        <h1 className="text-6xl font-bold sm:text-4xl">Page not found</h1>

        <p className="p-8 sm:p-2 sm:pb-6 sm:text-base sm:pt-6">
          The page that you are trying to reach is unfortunately not found.
          Please re-check the url you have entered. If the problem persists, try
          logging out and logging back in. Also, if your account is not yet
          verified, please go to your "Account" section and verify your account.
        </p>

        <div
          onClick={() => navigate("/")}
          className="hover:bg-[#c74a24] bg-[#e05f38] inline p-3 rounded-md cursor-pointer text-white sm:text-sm sm:p-1 truncate"
        >
          Go back to home page
        </div>
      </div>
    </div>
  );
};

export default NotFound;
