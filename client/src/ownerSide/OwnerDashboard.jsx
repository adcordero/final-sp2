import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../assets/LoadingScreen";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../assets/SweetAlert";

const OwnerDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  // should be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const navigate = useNavigate();

  const [allApartments, setAllApartments] = useState([]);
  const [allUnits, setAllUnits] = useState([]);
  const [allTenants, setAllTenants] = useState([]);
  const [allRents, setAllRents] = useState([]);
  const [allWaterBills, setAllWaterBills] = useState([]);
  const [allElectricityBills, setAllElectricityBills] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const aptRes = await fetch(
          `/api/owner/get-apartments/${currentUser._id}`
        );
        const aptData = await aptRes.json();

        const unitRes = await fetch(`/api/owner/get-units/${currentUser._id}`);
        const unitData = await unitRes.json();

        const tenantRes = await fetch(`/api/owner/get-all-tenants`);
        const tenantData = await tenantRes.json();

        const rentRes = await fetch(`/api/rent/get-all-rents-owner`);
        const rentData = await rentRes.json();

        const waterRes = await fetch(`/api/bill/get-all-water`);
        const waterData = await waterRes.json();

        const electricityRes = await fetch(`/api/bill/get-all-electricity`);
        const electricityData = await electricityRes.json();

        const getFeedbacksRes = await fetch(`/api/feedback/get-all-feedbacks`);
        const getFeedbacksData = await getFeedbacksRes.json();

        if (
          aptData.success === false ||
          unitData.success === false ||
          tenantData.success === false ||
          rentData.success === false ||
          waterData.success === false ||
          electricityData.success === false ||
          getFeedbacksData.success === false
        ) {
          SweetAlert.fire({
            icon: "error",
            title:
              aptData.errorMessage ||
              unitData.errorMessage ||
              tenantData.errorMessage ||
              rentData.errorMessage ||
              waterData.errorMessage ||
              electricityData.errorMessage ||
              getFeedbacksData.errorMessage,
          });
          return;
        }

        setAllApartments(aptData);
        setAllUnits(unitData);
        setAllTenants(tenantData);
        setAllRents(rentData);
        setAllWaterBills(waterData);
        setAllElectricityBills(electricityData);
        setAllFeedbacks(getFeedbacksData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [
    allApartments,
    allUnits,
    allRents,
    allTenants,
    allWaterBills,
    allElectricityBills,
    allFeedbacks,
  ]);

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
            <div className={`h-fit w-full mt-7 grid md:grid-cols-3 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* all apartments */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Apartment
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allApartments.length}
                  </h1>
                </div>
              </div>

              {/* column 2 */}
              <div className={``}>
                {/* all units */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Units
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allUnits.length}
                  </h1>
                </div>
              </div>

              {/* column 3 */}
              <div className={``}>
                {/* all tenants */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Tenants
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allTenants.length}
                  </h1>
                </div>
              </div>

              {/* column 4 */}
              <div className={``}>
                {/* all rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Rent Bills
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allRents.length}
                  </h1>
                </div>
              </div>

              {/* column 5 */}
              <div className={``}>
                {/* all water */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Water Bills
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allWaterBills.length}
                  </h1>
                </div>
              </div>

              {/* column 6 */}
              <div className={``}>
                {/* all electricity */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Electricity Bills
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allElectricityBills.length}
                  </h1>
                </div>
              </div>

              {/* column 7 */}
              <div className={``}>
                {/* all feedback */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    All Feedback
                  </h1>

                  <h1
                    className={`font-poppins text-base py-1 px-2 truncate justify-self-end`}
                  >
                    {allFeedbacks.length}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerDashboard;
