import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import SweetAlert from "../assets/SweetAlert";
import Loading from "../assets/LoadingScreen";

const BillDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const bill_id = pathname_array[3];

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const navigate = useNavigate();

  const [billDetail, setBillDetail] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        // console.log(bill_id);
        const billRes = await fetch(`/api/bill/find-bill/${bill_id}`);
        const billData = await billRes.json();

        if (billData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: billData.errorMessage,
          });
          return;
        }

        const createdAt_Array = billData.createdAt.split("T");
        billData.createdAt = createdAt_Array[0];

        setBillDetail(billData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [BillDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/bill/acknowledge-bill/${bill_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.success === false) {
        SweetAlert.fire({
          icon: "error",
          title: data.errorMessage,
        });
        return;
      }

      window.location.reload();

      SweetAlert.fire({
        icon: "success",
        title: "Bill acknowledged!",
      });

      
      // if (addModal) {
      //   window.location.reload();
      // }
    } catch (error) {
      SweetAlert.fire({
        icon: "error",
        title: error,
      });
      
    }
  };

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar
          currentPage={
            billDetail.bill_type == "Water"
              ? "/owner-waters"
              : "/owner-electricities"
          }
        />

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
              {billDetail.bill_type == "Water" ? (
                <span
                  className={`cursor-pointer hover:text-logo-blue hover:underline`}
                  onClick={() => navigate("/owner-waters")}
                >
                  Water
                </span>
              ) : (
                <span
                  className={`cursor-pointer hover:text-logo-blue hover:underline`}
                  onClick={() => navigate("/owner-electricities")}
                >
                  Electricity
                </span>
              )}
              {">"}
              <h1> Detail</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                {billDetail.tenant_name}
              </div>

              {billDetail.status == "Pending" ? (
                <button
                  className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                  onClick={handleSubmit}
                >
                  Acknowledge
                </button>
              ) : null}
            </div>

            {/* apartment details */}
            <div>
              <h1>{billDetail.createdAt}</h1>
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
                <h1>{billDetail.amount}</h1>
                <h1
                  className={`${
                    billDetail.status == "Pending"
                      ? "text-yellow-500"
                      : billDetail.status == "Paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {billDetail.status}
                </h1>
              </div>
            </div>

            <div className={`mt-7 grid md:grid-cols-2 gap-10`}>
              {/* column 1 */}
              <div className={``}>
                {/* rent */}
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Bill Proof
                  </h1>

                  <div
                    className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                  >
                    <img
                      src={billDetail.bill_proof}
                      alt="payment proof"
                      className={`max-w-1/2 h-auto`}
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
                    Payment Proof
                  </h1>

                  <div
                    className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                  >
                    {billDetail.payment_proof ? (
                      <img
                        src={billDetail.payment_proof}
                        alt="payment proof"
                        className={`max-w-1/2 h-auto`}
                      />
                    ) : (
                      "No payment proof yet."
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* last div */}
          </div>
        )}
      </div>
    </>
  );
};

export default BillDetail;
