import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";
import { useSelector } from "react-redux";
import {
  faCircleInfo,
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RentPage = () => {
  // should be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true); //currently in false bcs useEffect is empty
  const navigate = useNavigate();
  const [allRents, setAllRents] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const rentRes = await fetch(`/api/rent/get-all-rents/${currentUser._id}`);
        const rentData = await rentRes.json();

        if (rentData.success === false) {
          // toast.error(data.errorMessage);
          SweetAlert.fire({
            icon: "error",
            title: rentData.errorMessage,
          });
          return;
        }

        setAllRents(rentData);
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
        <Sidebar currentPage={"/tenant-rent"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* tags */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/tenant-rent")}
              >
                Rent
              </span>
              {">"}
              <h1> Invoices</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Rent Invoices
              </div>

              {/* <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New Unit
              </button> */}
            </div>

            {/* rent list */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* search bar */}
              <div className={`p-3`}>
                <form
                  className={`w-fit justify-self-end border-2 px-2 py-1 flex gap-3 rounded-md`}
                >
                  <input
                    type="text"
                    placeholder="Search Rent Invoices"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div>

              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Due Date</h1>
                {/* <h1 className={`hidden md:inline`}>Apartment</h1>
                <h1 className={`hidden md:inline`}>Type</h1> */}
                <h1>Amount</h1>
                <h1>Status</h1>
                {/* <h1>Advance</h1> */}

                {/* <h1>Status</h1> */}
              </div>

              {/* list invoices */}
              {allRents.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Nothing to pay yet.
                </div>
              ) : (
                allRents.map((rent) => (
                  <div
                    key={rent._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1>{rent.due_date}</h1>
                    <h1>{rent.amount}</h1>

                    <div className={`flex justify-between`}>
                      <p
                        className={`${
                          rent.status == "Pending"
                            ? "text-yellow-500"
                            : rent.status == "Overdue"
                            ? "text-red-500"
                            : "text-green-50"
                        }`}
                      >
                        {rent.status}
                      </p>
                      {/* {rent.status} */}

                      {/* buttons */}
                      <div className={`flex gap-3`}>
                        {/* edit */}
                        <button
                          className={`text-blue-600 cursor-pointer flex items-center text-base`}
                          onClick={() => navigate(`/tenant-rent/detail/${rent._id}`)}
                          title="Details"
                        >
                          <FontAwesomeIcon icon={faCircleInfo} />
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

            {/* last div of main body */}
          </div>
        )}
      </div>
    </>
  );
};

export default RentPage;
