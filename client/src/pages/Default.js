import React from "react";
import { useNavigate } from "react-router-dom";

const Default = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="absolute top-6 filter blur-2xl  mix-blend-multiply rounded-full -z-10 bg-[#c74a24] opacity-40 w-3/4 h-3/4 text-white"></div>
      <div className="absolute top-6 filter blur-2xl right-0 mix-blend-multiply rounded-full -z-10 bg-[#e05f38] opacity-40 w-3/4 h-3/4 text-white"></div>

      <div className="w-full h-screen -z-20">
        <div className="text-lg z-20 pt-20">
          <h1 className="text-center text-black text-4xl md:text-3xl sm:text-2xl py-4 pt-12">
            Welcome to
          </h1>
          <h2 className="text-center text-white text-8xl md:text-7xl sm:text-5xl pt-4 pb-2 sm:pb-4 font-bold">
            F-Mail
          </h2>
          <h3 className="text-center text-black md:text-base sm:text-sm sm:px-4">
            The most reliable mailing service in the world.
          </h3>
          <div className="fixed bottom-0 w-full flex md:block md:relative lg:px-2 md:px-24 sm:px-4 justify-around bg-blue-50 p-8 mt-24 border-black border-t-4">
            <div className="w-96 md:w-full lg:w-80 lg:p-2 h-52 sm:h-40 bg-blue-200 p-4 text-center rounded-md flex flex-col justify-around items-center">
              <h1 className="text-2xl sm:text-lg font-semibold">
                Already a user?
              </h1>

              <div
                className="text-white cursor-pointer w-48 sm:w-32 sm:text-base sm:text-sm p-2 rounded-md hover:bg-[#c74a24] bg-[#e05f38]"
                onClick={() => navigate("/login")}
              >
                Login Now!
              </div>
            </div>
            <div className="w-96 md:w-full md:mt-8 lg:w-80 lg:p-2 h-52 sm:h-40 bg-blue-200 p-4 text-center rounded-md flex flex-col justify-around items-center">
              <h1 className="text-2xl sm:text-lg font-semibold">
                New to our service?
              </h1>

              <div
                className="text-white cursor-pointer w-48 sm:w-32 sm:text-base sm:text-sm p-2 rounded-md hover:bg-[#c74a24] bg-[#e05f38]"
                onClick={() => navigate("/register")}
              >
                Register Now!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Default;
