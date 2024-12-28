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

  const navigate = useNavigate();

  const [allRent, setAllRent] = useState([]);
  const allRent_nameSort = allRent.sort((a, b) =>
    a.tenant_name.localeCompare(b.tenant_name)
  );
  const allRent_statusSort = allRent_nameSort.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const waterBillRes = await fetch(`/api/rent/get-all-rents-owner`);

        const waterBillData = await waterBillRes.json();

        if (waterBillData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: waterBillData.errorMessage,
          });
          return;
        }

        setAllRent(waterBillData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [allRent]);

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
                onClick={() => navigate("/owner-rents")}
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

            {/* rent payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md max-h-3/5 rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 md:grid-cols-4 justify-between`}
              >
                <h1>Tenant Name</h1>
                <h1>Due Date</h1>
                <h1 className={`hidden md:inline`}>Status</h1>
                <h1>Amount</h1>
              </div>

              {/* list pendings */}
              {allRent.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No water bills made.
                </div>
              ) : (
                allRent_statusSort.map((rent) => (
                  <div
                    key={rent._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 md:grid-cols-4 justify-between`}
                  >
                    <h1 className={``}>{rent.tenant_name}</h1>
                    <h1>{rent.due_date}</h1>
                    <h1
                      className={`hidden md:inline ${
                        rent.status == "Pending"
                          ? "text-yellow-500"
                          : rent.status == "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {rent.status}
                    </h1>

                    <div className={`flex justify-between`}>
                      <h1 className={``}>{rent.amount}</h1>

                      {rent.status == "Unpaid" ? null : (
                        <button
                          className={`text-blue-600 cursor-pointer flex items-center text-base`}
                          onClick={() =>
                            navigate(`/owner-rents/detail/${rent._id}`)
                          }
                          title="Details"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </button>
                      )}
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
