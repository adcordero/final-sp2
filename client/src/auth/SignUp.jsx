import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SweetAlert from "../assets/SweetAlert";

const SignUp = () => {
  const navigate = useNavigate();

  const [ownerLoading, setOwnerLoading] = useState(false);
  const [tenantLoading, setTenantLoading] = useState(false);

  //   holder for input data
  const [formData, setFormData] = useState({
    first_name: "",
    mid_name: "",
    last_name: "",
    contact_num: "",
    email: "",
    password: "",
    // apt_id: "",
    // acc_type: "2"
  });

  // handles changes made in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };

  // handles the creation of tenant account
  const handleCreateTenantAccount = async (e) => {
    e.preventDefault();

    // setFormData({ ...formData, unit_id: " " });

    const passRegEx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?!.* ).{8,16}$/;

    setTenantLoading(true);

    if (passRegEx.test(formData.password)) {
      try {
        const res = await fetch("/api/user/tenant-sign-up", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success == false) {
          // toast.error(data.message)
          setTenantLoading(false);
          // toast.error(data.errorMessage);
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });
          // setError(data.message);
          return;
        }

        // toast.success("Please check email!");
        SweetAlert.fire({
          icon: "info",
          title: "Please check email!",
        });
        setTenantLoading(false);

        navigate("/");
      } catch (error) {
        setTenantLoading(false);
        // toast.error(data.errorMessage);
        SweetAlert.fire({
          icon: "error",
          title: data.errorMessage,
        });
      }
    } else {
      // toast.error(
      //   "Password should have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*_=+-)"
      // );
      SweetAlert.fire({
        icon: "error",
        title:
          "Password should have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*_=+-)",
      });
    }
  };

  // handles the creation of owner account
  const handleCreateOwnerAccount = async (e) => {
    e.preventDefault();

    const passRegEx =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?!.* ).{8,16}$/;

    setOwnerLoading(true);

    if (passRegEx.test(formData.password)) {
      try {
        const res = await fetch("/api/user/owner-sign-up", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success == false) {
          // toast.error(data.message)
          setOwnerLoading(false);
          // toast.error(data.errorMessage);
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });

          // setError(data.message);
          return;
        }

        // toast.success("Please check email!");
        SweetAlert.fire({
          icon: "info",
          title: "Please check email!",
        })
        setOwnerLoading(false);

        navigate("/");
      } catch (error) {
        setOwnerLoading(false);
        // toast.error(data.errorMessage);
        SweetAlert.fire({
          icon: "error",
          title: data.errorMessage,
        })
      }
    } else {
      // toast.error(
      //   "Password should have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*_=+-)"
      // );
      SweetAlert.fire({
        icon: "error",
        title: "Password should have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*_=+-)",
      })
    }
  };

  return (
    <>
      <div
        className={`flex items-center bg-gradient-to-b from-logo-white from-10% via-logo-blue-gray to-logo-blue justify-center w-full h-[calc(100vh-3.5rem)] overflow-auto`}
      >
        <div
          className={`w-5/6 bg-white grid justify-items-center rounded-md shadow-lg h-fit p-5 gap-y-3 md:w-4/6`}
        >
          <div
            className={`w-full grid justify-self-center self-center gap-y-1 h-fit`}
          >
            <h1 className={`font-poppins font-semibold text-xl md:text-2xl`}>
              Welcome to UPA!
            </h1>

            <h2 className={`font-nunito-sans font-normal text-base md:text-lg`}>
              We just need a bit more information to create your account...
            </h2>
          </div>

          <form
            // onSubmit={handleCreateAccount}
            className={` w-full grid justify-self-center self-center gap-3`}
          >
            {/* names */}
            <div className={`w-full grid gap-y-3 md:grid-cols-3 md:gap-x-3`}>
              <label className={`grid grid-cols gap-2`}>
                <h1 className={`text-base font-semibold font-poppins pl-1`}>
                  First Name
                </h1>

                <input
                  type="text"
                  placeholder="First Name"
                  id="first_name"
                  className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nuinto-sans`}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={`grid grid-cols gap-2`}>
                <h1 className={`text-base font-semibold font-poppins pl-1`}>
                  Middle Name
                </h1>
                <input
                  type="text"
                  placeholder="Middle Name"
                  id="mid_name"
                  className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nuinto-sans`}
                  onChange={handleChange}
                />
              </label>

              <label className={`grid grid-cols gap-2`}>
                <h1 className={`text-base font-semibold font-poppins pl-1`}>
                  Last Name
                </h1>
                <input
                  type="text"
                  placeholder="Last Name"
                  id="last_name"
                  className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nuinto-sans`}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* contact number */}
            <label className={`grid grid-cols gap-2`}>
              <h1 className={`text-base font-semibold font-poppins pl-1`}>
                Contact Number
              </h1>
              <input
                type="tel"
                placeholder="09*********"
                id="contact_num"
                className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nuinto-sans`}
                onChange={handleChange}
                required
              />
            </label>

            {/* email */}
            <label className={`grid grid-cols gap-2`}>
              <h1 className={`text-base font-semibold font-poppins pl-1`}>
                Email
              </h1>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nuinto-sans`}
                onChange={handleChange}
                required
              />
            </label>

            {/* password */}
            <label className={`grid grid-cols gap-2`}>
              <h1 className={`text-base font-semibold font-poppins pl-1`}>
                Password
              </h1>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nuinto-sans`}
                onChange={handleChange}
                required
              />
            </label>

            {/* submit buttons */}
            <div
              className={`flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-evenly`}
            >
              <button
                type="submit"
                className={`justify-self-center no-wrap text-base rounded p-1 md:text-lg md:w-1/4 w-2/4 font-semibold text-main-violet shadow-md border-2 border-transparent hover:border-logo-gray-blue font-poppins`}
                onClick={handleCreateOwnerAccount}
              >
                {/* Create Account */}
                {ownerLoading ? "Please wait. . ." : "Create Owner"}
              </button>

              <button
                type="submit"
                className={`justify-self-center no-wrap text-base rounded p-1 md:text-lg md:w-1/4 w-2/4 font-semibold text-main-violet shadow-md border-2 border-transparent hover:border-logo-gray-blue font-poppins`}
                onClick={handleCreateTenantAccount}
              >
                {/* Create Account */}
                {tenantLoading ? "Please wait. . ." : "Create Tenant"}
              </button>
            </div>
          </form>

          <h1 className={`font-source text-sm`}>
            Already have an account?&nbsp;
            <Link to={"/"}>
              <span
                className={`text-logo-gray-blue hover:text-logo-blue font-bold cursor-pointer font-oswald`}
              >
                Login
              </span>
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default SignUp;
