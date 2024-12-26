import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";
import Loading from "../../assets/LoadingScreen";
import RentReceiptModal from "./RentReceiptModal";

const O_RentDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const rent_id = pathname_array[3];

  const navigate = useNavigate();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const [rentDetail, setRentDetail] = useState([]);

  const [updateModal, setUpdateModal] = useState(false);

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch(`/api/rent/get-one-rent/${rent_id}`);
        const data = await res.json();

        if (data.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });
          return;
        }

        setRentDetail(data);
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
        <Sidebar currentPage={"/owner-rents"} />

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
                onClick={() => navigate("/owner-rents")}
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
                {rentDetail.tenant_name}
                {/* {rentDetail.amount} */}
              </div>

              {rentDetail.status == "Paid" ? null : (
                <button
                  className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                  // onClick={() => fileRef.current.click()}
                  onClick={showUpdateModal}
                >
                  Add Receipt
                </button>
              )}
            </div>

            <div>
              <h1>{rentDetail.due_date}</h1>
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

            <div className={`h-fit w-full mt-7 grid grid-cols-2 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Payment Proof
                  </h1>

                  <div
                    className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                  >
                    <img
                      src={rentDetail.payment_proof}
                      alt="payment proof"
                      className={`max-w-96 h-auto`}
                    />
                  </div>
                </div>
              </div>

              {/* column 2 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Receipt
                  </h1>

                  {rentDetail.invoice ? (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      <img
                        src={rentDetail.invoice}
                        alt="receipt"
                        className={`max-w-96 h-auto`}
                      />
                    </div>
                  ) : (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      No receipt uploaded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* final div */}
          </div>
        )}
      </div>

      {updateModal ? (
        <RentReceiptModal showUpdateModal={showUpdateModal} />
      ) : null}
    </>
  );
};

export default O_RentDetail;
