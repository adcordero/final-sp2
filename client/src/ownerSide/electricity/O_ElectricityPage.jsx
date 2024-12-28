import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faInfoCircle,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import SweetAlert from "../../assets/SweetAlert";
import AddWaterBill from "../../components/AddBillModal";

const O_ElectricityPage = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const navigate = useNavigate();

  const [allElect, setAllElect] = useState([]);
  const allElect_statusSort = allElect.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  const [addModal, setAddModal] = useState(false);

  const showAddModal = () => {
    setAddModal(!addModal);

    if (addModal) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const unpaidRes = await fetch(`/api/bill/get-all-electricity`);
        const unpaidData = await unpaidRes.json();

        if (unpaidData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: unpaidData.errorMessage,
          });
          return;
        }

        setAllElect(unpaidData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [allElect]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/owner-electricities"} />

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
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-electricities")}
              >
                Electricity
              </span>
              {">"}
              <h1>List</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Electricity Bills
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New <span className={`hidden md:inline`}>Electricity Bill</span>
              </button>
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md max-h-3/5 rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Tenant Name</h1>
                <h1>Amount</h1>
                <h1>Status</h1>
              </div>

              {allElect.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No bill created yet.
                </div>
              ) : (
                allElect_statusSort.map((electricity) => (
                  <div
                    key={electricity._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1 className={``}>{electricity.tenant_name}</h1>
                    <h1>{electricity.amount}</h1>

                    <div className={`flex justify-between`}>
                      <h1
                        className={`${
                          electricity.status == "Pending"
                            ? "text-yellow-500"
                            : electricity.status == "Paid"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {electricity.status}
                      </h1>

                      <button
                        className={`text-blue-600 cursor-pointer flex items-center text-base`}
                        onClick={() => navigate(`/bill/detail/${electricity._id}`)}
                        title="Details"
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
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

      {addModal ? (
        <AddWaterBill showAddModal={showAddModal} billType={"Electricity"} />
      ) : null}
    </>
  );
};

export default O_ElectricityPage;
