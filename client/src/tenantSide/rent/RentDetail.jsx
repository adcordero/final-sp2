import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";
import { useSelector } from "react-redux";
import Loading from "../../assets/LoadingScreen";

const RentDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const rent_id = pathname_array[3];

  const navigate = useNavigate();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  const [updateModal, setUpdateModal] = useState(false);

  const [rentDetail, setRentDetail] = useState([]);

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const rentRes = await fetch(`/api/rent/get-one-rent/${rent_id}`);

        const rentData = await rentRes.json();

        if (rentData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: rentData.errorMessage,
          });
          return;
        }

        setRentDetail(rentData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [rentDetail]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/tenant-rent"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main body
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
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
              <h1> Rent Detail</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                {rentDetail.due_date}
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showUpdateModal}
              >
                Add Payment
              </button>
            </div>

            {/* rent detail */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* list details */}
              <div >

              </div>
            </div>

            {/* main body last div */}
          </div>
        )}
      </div>
    </>
  );
};

export default RentDetail;
