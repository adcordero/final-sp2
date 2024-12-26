import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import SweetAlert from "../../assets/SweetAlert";
import Sidebar from "../../components/Sidebar";

const O_RentPage = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const [allPendings, setAllPendings] = useState([]);
  const [allUnpaids, setAllUnpaids] = useState([]);
  const [allPaids, setAllPaids] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const pendingRes = await fetch(`/api/rent/get-pending-rents`);
        const pendingData = await pendingRes.json();

        const unpaidRes = await fetch(`/api/rent/get-unpaid-rents`);
        const unpaidData = await unpaidRes.json();

        if (pendingData.success === false || unpaidData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: pendingData.errorMessage || unpaidData.errorMessage,
          });
          return;
        }

        setAllPendings(pendingData);
        setAllUnpaids(unpaidData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, []);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/owner-rents"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* tags */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-units")}
              >
                Rent
              </span>
              {">"}
              <h1> All Payments</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Rent Payments
              </div>
            </div>

            {/* pending rent payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md max-h-3/5 rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* title */}
              <div className={`p-3`}>
                <h1>Pending</h1>
              </div>
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Tenant Name</h1>
                <h1>Due Date</h1>
                <h1>Amount</h1>

                {/* <h1>Status</h1> */}
              </div>

              {/* list pendings */}
              {allPendings.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No pending payments
                </div>
              ) : (
                allPendings.map((rent) => (
                  <div
                    key={rent._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1 className={``}>{rent.tenant_name}</h1>
                    <h1>{rent.due_date}</h1>

                    <div className={`flex justify-between`}>
                      <h1 className={``}>{rent.amount}</h1>

                      {/* buttons */}
                      <div className={`flex gap-3`}>
                        {/* edit */}
                        <button
                          className={`text-blue-600 cursor-pointer flex items-center text-base`}
                          // onClick={() => {
                          //   showUpdateModal();
                          //   setChosenUnitId(unit._id);
                          // }}
                          title="Details"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          {/* <h1>Edit</h1> */}
                        </button>

                        {/* delete */}
                        <button
                          className={`text-red-600 cursor-pointer flex gap-1 items-center text-base`}
                          // onClick={(e) => {
                          //   handleDeleteUnit(e, unit._id);
                          //   // setChosenUnitId(unit._id);
                          // }}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          {/* <h1>Edit</h1> */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* unpaid rent payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md max-h-3/5 rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* title */}
              <div className={`p-3`}>
                <h1>Unpaid</h1>
              </div>
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Tenant Name</h1>
                <h1>Due Date</h1>
                <h1>Amount</h1>

                {/* <h1>Status</h1> */}
              </div>

              {/* list pendings */}
              {allUnpaids.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No pending payments
                </div>
              ) : (
                allUnpaids.map((rent) => (
                  <div
                    key={rent._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1 className={``}>{rent.tenant_name}</h1>
                    <h1>{rent.due_date}</h1>

                    <div className={`flex justify-between`}>
                      <h1 className={``}>{rent.amount}</h1>

                      {/* buttons */}
                      <div className={`flex gap-3`}>
                        {/* edit */}
                        <button
                          className={`text-blue-600 cursor-pointer flex items-center text-base`}
                          // onClick={() => {
                          //   showUpdateModal();
                          //   setChosenUnitId(unit._id);
                          // }}
                          title="Details"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                          {/* <h1>Edit</h1> */}
                        </button>

                        {/* delete */}
                        <button
                          className={`text-red-600 cursor-pointer flex gap-1 items-center text-base`}
                          // onClick={(e) => {
                          //   handleDeleteUnit(e, unit._id);
                          //   // setChosenUnitId(unit._id);
                          // }}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          {/* <h1>Edit</h1> */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* last div of main */}
          </div>
        )}
      </div>
    </>
  );
};

export default O_RentPage;
