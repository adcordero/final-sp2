import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBuilding,
  faBuildingUser,
  faDroplet,
  faHouse,
  faInbox,
  faPeopleGroup,
  faReceipt,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ currentPage }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] p-4 bg-logo-white`}>
        <div
          className={`flex flex-col items-center justify-center gap-4 md:w-52 w-32 `}
        >
          {currentUser.user_type === "Owner" ? (
            // owner sidebar
            <div
              className={`w-full flex flex-col justify-items-start content-center gap-5`}
            >
              {/* dashboard */}
              <div
                className={`w-auto flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                  currentPage == "/owner-dashboard"
                    ? "bg-logo-blue rounded-lg text-logo-white"
                    : "text-zinc-600"
                } `}
              >
                <FontAwesomeIcon icon={faHouse} className={`text-sm `} />
                <p className={`md:text-lg text-base`}>Dashboard</p>
              </div>

              {/* apartment management */}
              <div className={` w-full `}>
                <h1
                  className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                >
                  Aparment Management
                </h1>

                {/* apartment */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faBuilding} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Apartments</p>
                </div>

                {/* unit */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon
                    icon={faBuildingUser}
                    className={`text-sm`}
                  />
                  <p className={`md:text-lg text-base truncate`}>House Units</p>
                </div>
              </div>

              {/* tenant management */}
              <div className={` w-full `}>
                <h1
                  className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                >
                  Tenant Management
                </h1>

                {/* tenant */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    className={`text-sm `}
                  />
                  <p className={`md:text-lg text-base truncate`}>Tenants</p>
                </div>
              </div>

              {/* payment management */}
              <div className={` w-full `}>
                <h1
                  className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                >
                  Payment Management
                </h1>

                {/* payment */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faReceipt} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Payments</p>
                </div>
              </div>

              {/* feedback management */}
              <div className={` w-full `}>
                <h1
                  className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                >
                  Feedback Management
                </h1>

                {/* feedback */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faInbox} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Feedbacks</p>
                </div>
              </div>

              <hr className={`w-full border-logo-blue-gray`} />

              {/* logout */}
              <div
                className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  rounded-md bg-logo-gray text-logo-white hover:bg-logo-blue-gray hover:text-logo-white`}
                onClick={onLogoutClick}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={`text-sm `}
                />
                <p className={`md:text-lg text-base`}>Sign Out</p>
              </div>
            </div>
          ) : (
            // tenant sidebar
            <div
              className={`w-full flex flex-col justify-items-start content-center gap-5`}
            >
              {/* dashboard */}
              <div
                className={`w-auto flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                  currentPage == "/t-home"
                    ? "bg-logo-blue rounded-lg text-logo-white"
                    : "text-zinc-600"
                } `}
              >
                <FontAwesomeIcon icon={faHouse} className={`text-sm `} />
                <p className={`md:text-lg text-base`}>Dashboard</p>
              </div>

              {/* bills management */}
              <div className={` w-full `}>
                <h1
                  className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                >
                  Bills Management
                </h1>

                {/* rent */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faReceipt} className={`text-sm`} />
                  <p className={`md:text-lg text-base truncate`}>
                    Rent Payments
                  </p>
                </div>

                {/* water */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/water-bill"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faDroplet} className={`text-sm`} />
                  <p className={`md:text-lg text-base truncate`}>
                    Water Payments
                  </p>
                </div>

                {/* power */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/power-bill"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faBolt} className={`text-sm`} />
                  <p className={`md:text-lg text-base truncate`}>
                    Power Payments
                  </p>
                </div>
              </div>

              {/* feedback management */}
              <div className={` w-full `}>
                <h1
                  className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                >
                  Feedback Management
                </h1>

                {/* water */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white ${
                    currentPage == "/t-feedbacks"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                >
                  <FontAwesomeIcon icon={faInbox} className={`text-sm`} />
                  <p className={`md:text-lg text-base`}>Feedbacks</p>
                </div>
              </div>

              <hr className={`w-full border-logo-blue-gray`} />

              {/* logout */}
              <div
                className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  rounded-md bg-logo-gray text-logo-white hover:bg-logo-blue-gray hover:text-logo-white`}
                onClick={onLogoutClick}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={`text-sm `}
                />
                <p className={`md:text-lg text-base`}>Sign Out</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
