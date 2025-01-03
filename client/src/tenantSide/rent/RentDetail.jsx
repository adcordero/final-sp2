import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";
import Loading from "../../assets/LoadingScreen";
import RentPaymentModal from "./RentPaymentModal";

const RentDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const rent_id = pathname_array[3];

  const navigate = useNavigate();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

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
            {/* breadcrumbs */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              {/* <h1>Bills</h1>
              {">"} */}
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/tenant-rent")}
              >
                Rent
              </span>
              {">"}
              <h1>Detail</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                {rentDetail.due_date}
                {/* {rentDetail.amount} */}
              </div>

              {rentDetail.status == "Unpaid" ? (
                <button
                  className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                  // onClick={() => fileRef.current.click()}
                  onClick={showUpdateModal}
                >
                  Add <span className={`hidden md:inline`}>Payment</span>
                </button>
              ) : null}
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-2 justify-items-center`}
              >
                <h1>Amount</h1>
                <h1>Status</h1>
              </div>

              {/* list details */}
              <div
                className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-2 justify-items-center`}
              >
                <h1>{rentDetail.amount}</h1>
                <h1
                  className={`${
                    rentDetail.status == "Pending"
                      ? "text-yellow-500"
                      : rentDetail.status == "Paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {rentDetail.status}
                </h1>
              </div>
            </div>

            <div className={`h-fit w-full mt-7 grid md:grid-cols-2 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Payment Proof
                  </h1>

                  {rentDetail.payment_proof ? (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      <img
                        src={rentDetail.payment_proof}
                        alt="payment proof"
                        className={`max-w-1/2 h-auto`}
                      />
                    </div>
                  ) : (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      No payment proof uploaded
                    </div>
                  )}
                </div>
              </div>

              {/* column 2 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Invoice
                  </h1>

                  {rentDetail.invoice ? (
                    <div
                    className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                  >
                    <img
                      src={rentDetail.invoice}
                      alt="payment proof"
                      className={`max-w-1/2 h-auto`}
                    />
                  </div>
                  ) : (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      No invoice
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* main body last div */}
          </div>
        )}
      </div>

      {/* add payment */}
      {updateModal ? (
        <RentPaymentModal showUpdateModal={showUpdateModal} />
      ) : null}
    </>
  );
};

export default RentDetail;
