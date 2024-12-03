import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../assets/LoadingScreen";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  // should be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex `}>
        <Sidebar currentPage={"/owner-dashboard"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main body
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* welcoming statement */}
            <div
              className={`flex h-fit justify-start text-2xl text-black font-poppins`}
            >
              Welcome,&nbsp;
              <span className={`font-semibold`}>
                {currentUser.first_name + " " + currentUser.last_name}
              </span>
              !
            </div>

            {/* dashboard start */}
            <div className={`h-fit w-full mt-7 grid grid-cols-3 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* all apartments */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Apartment
                  </h1>

                  <h1></h1>
                </div>
              </div>

              {/* column 2 */}
              <div className={`border-2`}>col 2</div>

              {/* column 3 */}
              <div className={`border-2`}>col 3</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
