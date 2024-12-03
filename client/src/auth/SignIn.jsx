import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };

  const handleLoginAccount = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());

      const res = await fetch("/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success == false) {
        toast.error(data.errorMessage);

        dispatch(loginFailure(data.message));

        return;
      }

      if (data.status != "Active") {
        return next(errorHandler(401, "Please verify your email!"));
      }

      dispatch(loginSuccess(data));

      if (data.user_type == "Owner") {
        navigate("/o-dashboard");
      } else {
        navigate("/t-dashboard");
      }
    } catch (error) {
      toast.error(data.errorMessage);
    }
  };

  return (
    <>
      <div
        className={`flex  items-center bg-gradient-to-b from-logo-white from-10% via-logo-blue-gray to-logo-blue justify-center w-full h-[calc(100vh-3.5rem)] overflow-auto`}
      >
        <div
          className={`w-5/6 bg-logo-white  grid justify-items-center rounded-md shadow-lg h-fit p-5 gap-y-3 md:w-4/6`}
        >
          <div
            className={`w-full grid justify-self-center self-center gap-y-1 h-fit`}
          >
            <h1 className={`font-poppins font-semibold text-xl md:text-2xl`}>
              Welcome to UPA!
            </h1>

            <h2 className={`font-nunito-sans font-normal text-base `}>
              Login to see your dashboard...
            </h2>
          </div>

          <form
            onSubmit={handleLoginAccount}
            className={`w-full grid justify-self-center self-center gap-3`}
          >
            {/* email */}
            <label className={`grid gird-cols gap-2`}>
              <h1 className={`text-base font-semibold font-poppins pl-1`}>
                Email
              </h1>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans`}
                onChange={handleChange}
                required
              />
            </label>

            {/* password */}
            <label className={`grid gird-cols gap-2`}>
              <h1 className={`text-base font-semibold font-poppins pl-1`}>
                Password
              </h1>

              <input
                type="password"
                placeholder="Password"
                id="password"
                className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans`}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className={`justify-self-center no-wrap text-base rounded p-1 md:text-lg md:w-1/4 w-2/4 font-semibold text-main-violet shadow-md border-2 border-transparent hover:border-logo-gray-blue font-poppins`}
            >
              {/* Login */}
              {loading ? "Please wait. . ." : "Login"}
            </button>
          </form>

          <h1 className={`font-nunito-sans text-sm`}>
            Don't have an account yet?&nbsp;
            <Link to={"/sign-up"}>
              <span
                className={`text-logo-gray-blue hover:text-logo-blue font-semibold cursor-pointer font-poppins`}
              >
                Sign Up
              </span>
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default SignIn;
