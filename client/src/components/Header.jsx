import React, { useState } from "react";
import IMAGES from "../images/images.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const [buttonVal, setButtonVal] = useState("Sign In");

  const onLogoutClick = async () => {
    try {
      dispatch(logoutUserStart());

      const res = await fetch(`/api/user/sign-out/${currentUser._id}`, {
        method: "GET",
      });

      const data = await res.json();

      if (data.success == false) {
        dispatch(logoutUserFailure(data.message));

        return;
      }

      dispatch(logoutUserSuccess(data));

      toast.success(data);
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  };

  const onLogoClick = () => {
    if (currentUser) {
      if (currentUser.user_type == "Owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/tenant-dashboard");
      }
    } else {
      navigate("/");
    }
  };

  const onLoginClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={` sticky top-0 h-fit bg-logo-white text-logo-blue`}>
        <div
          className={`px-3 py-2 flex align-middle justify-between items-center max-w-[90rem] mx-auto gap-20`}
        >
          <div
            className={`flex items-center gap-1 w-auto cursor-pointer uppercase`}
            onClick={onLogoClick}
          >
            <img className={`size-10 w-fit`} src={IMAGES.logo} alt="logo" />
          </div>

          <div
            className={`flex items-center justify-center align-middle justify-items-center`}
          >
            {currentUser ? (
              <button
                className={` font-poppins font-semibold text-lg md:text-xl text-nowrap  hover:text-logo-gray-blue`}
                onClick={onLogoutClick}
              >
                Sign Out
              </button>
            ) : (
              <button
                className={` font-poppins font-semibold text-lg md:text-xl text-nowrap  hover:text-logo-gray-blue`}
                onClick={onLoginClick}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
