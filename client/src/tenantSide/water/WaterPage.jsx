import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";
import { useSelector } from "react-redux";
import { faCircleInfo, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WaterPage = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false); //currently in false bcs useEffect is empty
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [allWater, setAllWater] = useState([]);
  const allWater_statusSort = allWater.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      const waterRes = await fetch(
        `/api/bill/get-all-tenant-water/${currentUser._id}`
      );
      const waterData = await waterRes.json();

      if (waterData.success === false) {
        SweetAlert.fire({
          icon: "error",
          title: waterData.errorMessage,
        });
        return;
      }

      setAllWater(waterData);
      setShowLoadingScreen(false);
    };
    fetchNeededDetails();
  }, [allWater]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/tenant-water"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* breadcrumbs */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              {/* <h1>Bills</h1>
              {">"} */}
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/tenant-water")}
              >
                Water
              </span>
              {">"}
              <h1>List</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Water Bills
              </div>
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-2 justify-between`}
              >
                <h1>Amount</h1>
                <h1>Status</h1>
              </div>

              {allWater.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Nothing to pay yet.
                </div>
              ) : (
                allWater_statusSort.map((water) => (
                  <div
                    key={water._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-2 justify-between `}
                  >
                    <h1>{water.amount}</h1>
                    
                    <div className={`flex justify-between`}>
                    <h1
                      className={`${
                        water.status == "Pending"
                          ? "text-yellow-500"
                          : water.status == "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {water.status}
                    </h1>

                    <button
                        className={`text-blue-600 cursor-pointer flex items-center text-base`}
                        onClick={() =>
                          navigate(`/tenant-bill/detail/${water._id}`)
                        }
                        title="Details"
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                        {/* <h1>Edit</h1> */}
                      </button>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* last div */}
          </div>
        )}
      </div>
    </>
  );
};

export default WaterPage;
