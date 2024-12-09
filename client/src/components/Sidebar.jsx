import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
} from "../redux/user/userSlice";
// import { toast } from "react-toastify";
import SweetAlert from "../assets/SweetAlert";

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
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ currentPage }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      // toast.success(data);
      SweetAlert.fire({
        icon: "success",
        title: "Successfully logged out!",
      });
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
              className={`w-full flex flex-col justify-items-start content-center gap-3`}
            >
              {/* dashboard */}
              <div
                className={`w-auto flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                  currentPage == "/owner-dashboard"
                    ? "bg-logo-blue rounded-lg text-logo-white"
                    : ""
                } `}
                onClick={() => navigate("/owner-dashboard")}
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
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-apartments"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-apartments")}
                >
                  <FontAwesomeIcon icon={faBuilding} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Apartments</p>
                </div>

                {/* unit */}
                <div
                  className={` w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-units"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-units")}
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

                {/* requests */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-tenancy-request"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-tenancy-request")}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className={`text-sm `}
                  />
                  <p className={`md:text-lg text-base truncate`}>Tenancy Request</p>
                </div>

                {/* tenant */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-tenants"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-tenants")}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
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

                {/* rent */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-rents"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-rents")}
                >
                  <FontAwesomeIcon icon={faReceipt} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Rent Payments</p>
                </div>

                {/* water */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-waters"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-waters")}
                >
                  <FontAwesomeIcon icon={faDroplet} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Water Payments</p>
                </div>

                {/* electricity */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-electricities"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-electricities")}
                >
                  <FontAwesomeIcon icon={faBolt} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Electricity Payments</p>
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
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/owner-feedbacks"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                  onClick={() => navigate("/owner-feedbacks")}
                >
                  <FontAwesomeIcon icon={faInbox} className={`text-sm `} />
                  <p className={`md:text-lg text-base truncate`}>Feedbacks</p>
                </div>
              </div>

              <hr className={`w-full border-logo-blue-gray`} />

              {/* logout */}
              <div
                className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  rounded-md bg-logo-gray text-logo-white hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer`}
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
                className={`w-auto flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                  currentPage == "/tenant-dashboard"
                    ? "bg-logo-blue rounded-lg text-logo-white"
                    : ""
                } `}
                 onClick={() => navigate("/tenant-dashboard")}
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
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/rent"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                   onClick={() => navigate("/rent")}
                >
                  <FontAwesomeIcon icon={faReceipt} className={`text-sm`} />
                  <p className={`md:text-lg text-base truncate`}>
                    Rent Payments
                  </p>
                </div>

                {/* water */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/water-bill"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                   onClick={() => navigate("/water-bill")}
                >
                  <FontAwesomeIcon icon={faDroplet} className={`text-sm`} />
                  <p className={`md:text-lg text-base truncate`}>
                    Water Payments
                  </p>
                </div>

                {/* electricity */}
                <div
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/electricity-bill"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                   onClick={() => navigate("/electricity-bill")}
                >
                  <FontAwesomeIcon icon={faBolt} className={`text-sm`} />
                  <p className={`md:text-lg text-base truncate`}>
                    Electricity Payments
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
                  className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  hover:rounded-md hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer ${
                    currentPage == "/tenant-feedbacks"
                      ? "bg-logo-blue rounded-lg text-logo-white"
                      : ""
                  } `}
                   onClick={() => navigate("/tenant-feedbacks")}
                >
                  <FontAwesomeIcon icon={faInbox} className={`text-sm`} />
                  <p className={`md:text-lg text-base`}>Feedbacks</p>
                </div>
              </div>

              <hr className={`w-full border-logo-blue-gray`} />

              {/* logout */}
              <div
                className={`w-full flex gap-2 py-1 px-2 items-center justify-start font-nunito-sans  rounded-md bg-logo-gray text-logo-white hover:bg-logo-blue-gray hover:text-logo-white cursor-pointer`}
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
