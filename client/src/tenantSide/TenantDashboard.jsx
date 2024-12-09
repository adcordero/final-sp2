import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../assets/LoadingScreen";
import SweetAlert from "../assets/SweetAlert";
// import { toast } from "react-toastify";

const TenantDashboard = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  // apartment + unit details
  // const [estDetail, setEstDetail] = useState([]);
  const [unitDetail, setUnitDetail] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const unitRes = await fetch(
          `/api/apartment/find-unit/${currentUser.unit_id}`
        );
        const unitData = await unitRes.json();

        if (unitData.success === false) {
          SweetAlert({
            icon: "error",
            text: unitData.message,
          });
          return;
        }

        // const apartmentRes = await fetch(`/api/apartment/find-apartment/${unitData.apt_id}`);
        setUnitDetail(unitData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert({
          icon: "error",
          text: error.message,
        });
      }
    };

    fetchNeededDetails();
  }, []);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/tenant-dashboard"} />
        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main body
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* welcoming statement */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-apartments")}
              >
                Dashboard
              </span>
              {/* {">"}
              <h1> Dash</h1> */}
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-poppins`}
              >
                Welcome,&nbsp;
                <span className={`font-semibold`}>
                  {currentUser.first_name + " " + currentUser.last_name}
                </span>
                !
              </div>
            </div>

            {/* tenant details */}
            <div>
              <h1>{currentUser.email + " - " + currentUser.contact_num}</h1>
            </div>

            {/* unit detail */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 h-fit`}
            >
              {/* unit list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}
              >
                <h1>Name</h1>
                <h1>Rent</h1>
                <h1>Deposit</h1>
                <h1>Advance</h1>
                <h1>Balance</h1>
              </div>

              {/* unit list */}
              {unitDetail.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Not yet linked to a unit.
                </div>
              ) : (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-5 justify-between`}
                >
                  <h1>{unitDetail.apt_name + " - " + unitDetail.name}</h1>
                  <h1>{unitDetail.rent}</h1>
                  <h1>{unitDetail.deposit}</h1>
                  <h1>{unitDetail.advance}</h1>
                  <h1>{currentUser.balance}</h1>
                </div>
              )}
            </div>
            
            <div className={`h-fit w-full mt-7 grid grid-cols-3 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Rent Payments
                  </h1>

                  <h1></h1>
                </div>
              </div>

              {/* column 2 */}
              <div className={``}>
                {/* water */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Water Payments
                  </h1>

                  <h1></h1>
                </div>
              </div>

              {/* column 3 */}
              <div className={``}>
                {/* electricity */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Electricity Payments
                  </h1>

                  <h1></h1>
                </div>
              </div>

              {/* column 4 */}
              <div className={``}>
                {/* feedbacks */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Feedbacks
                  </h1>

                  <h1></h1>
                </div>
              </div>
            </div>

            

            {/* last div of main body */}
          </div>
        )}
      </div>
    </>
  );
};

export default TenantDashboard;
