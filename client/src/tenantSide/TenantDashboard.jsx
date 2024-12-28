import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../assets/LoadingScreen";
import SweetAlert from "../assets/SweetAlert";
// import { toast } from "react-toastify";

const TenantDashboard = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const [unitDetail, setUnitDetail] = useState([]);
  const [tenantDetail, setTenantDetail] = useState([]);
  const [rentDetail, setRentDetail] = useState([]);
  const [waterDetail, setWaterDetail] = useState([]);
  const [electricityDetail, setElectricityDetail] = useState([]);
  const [feedbackDetail, setFeedbackDetail] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const unitRes = await fetch(
          `/api/apartment/find-unit/${currentUser.unit_id}`
        );
        const unitData = await unitRes.json();

        const tenantRes = await fetch(`/api/owner/get-tenant/${currentUser._id}`);
        const tenantData = await tenantRes.json();

        const rentRes = await fetch(
          `/api/rent/get-all-rents/${currentUser._id}`
        );
        const rentData = await rentRes.json();

        const waterRes = await fetch(
          `/api/bill/get-all-tenant-water/${currentUser._id}`
        );
        const waterData = await waterRes.json();

        const electricityRes = await fetch(
          `/api/bill/get-all-tenant-electricity/${currentUser._id}`
        );
        const electricityData = await electricityRes.json();

        const feedbackRes = await fetch(
          `/api/feedback/get-tenant-feedback/${currentUser._id}`
        );
        const feedbackData = await feedbackRes.json();

        if (unitData.success == false || tenantData.success == false || rentData.success == false || waterData.success == false || electricityData.success == false || feedbackData.success == false) {
          SweetAlert({
            icon: "error",
            text: unitData.message || tenantData.message || rentData.message || waterData.message || electricityData.message || feedbackData.message,
          });
          return;
        }

        setUnitDetail(unitData);
        setTenantDetail(tenantData);
        setRentDetail(rentData);
        setWaterDetail(waterData);
        setElectricityDetail(electricityData);
        setFeedbackDetail(feedbackData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert({
          icon: "error",
          text: error.message,
        });
      }
    };

    fetchNeededDetails();
  }, [tenantDetail, rentDetail, waterDetail, electricityDetail, feedbackDetail]);

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
                className={`flex  h-fit justify-start text-3xl text-black font-poppins`}
              >
                Welcome
                <span className={`hidden md:inline`}>,&nbsp;</span>
                <span className={`font-semibold hidden md:inline`}>
                  {currentUser.first_name + " " + currentUser.last_name}
                </span>
                !
              </div>
            </div>

            {/* unit detail */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 h-fit`}
            >
              {/* unit list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 md:grid-cols-5 justify-between`}
              >
                <h1>Name</h1>
                <h1>Rent</h1>
                <h1 className={`hidden md:inline`}>Deposit</h1>
                <h1 className={`hidden md:inline`}>Advance</h1>
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
                  className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 md:grid-cols-5 justify-between`}
                >
                  <h1>{unitDetail.apt_name + " - " + unitDetail.name}</h1>
                  <h1>{unitDetail.rent}</h1>
                  <h1 className={`hidden md:inline`}>{unitDetail.deposit}</h1>
                  <h1 className={`hidden md:inline`}>{unitDetail.advance}</h1>
                  <h1>{tenantDetail.balance}</h1>
                </div>
              )}
            </div>
            
            <div className={`h-fit w-full mt-7 grid md:grid-cols-3 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Rent Payments
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {rentDetail.length}
                  </h1>
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

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {waterDetail.length}
                  </h1>
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

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {electricityDetail.length}
                  </h1>
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

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {feedbackDetail.length}
                  </h1>
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
