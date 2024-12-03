import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");

  useEffect(() => {
    const verifiedComplete = () => {
      try {
        const res = fetch(`/api/user/confirm-email/${pathname_array[2]}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
      } catch (error) {
        next(error);
      }
    };

    verifiedComplete();
  });

  return (
    <>
      <div
        className={`flex items-center justify-center w-full md:h-[calc(100vh-3rem)] h-[calc(100vh-2.75rem)] bg-gradient-to-b from-logo-white from-10% via-logo-blue-gray to-logo-blue`}
      >
        <div
          className={`w-3/6 bg-white grid justify-items-center rounded-md shadow-lg min-h-fit p-5 gap-y-3 md:w-2/6`}
        >
          <h1 className={`font-poppins text-3xl font-semibold`}>
            Account Verified!
          </h1>

          <span
            className={`font-nunito-sans text-lg text-logo-gray-blue hover:text-logo-blue font-bold cursor-pointer`}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
