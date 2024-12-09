import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import Swal from "sweetalert2";
import SweetAlert from "../../assets/SweetAlert";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UpdateTenant from "./UpdateTenant";

const TenantDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const tenant_id = pathname_array[3];

  const navigate = useNavigate();

  const [tenantDetail, setTenantDetail] = useState([]);
  const [unitDetail, setUnitDetail] = useState([]);

  // shoudl be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const tenantRes = await fetch(`/api/owner/get-tenant/${tenant_id}`);
        const tenantData = await tenantRes.json();

        if (tenantData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: tenantData.errorMessage,
          });
          return;
        }
        setTenantDetail(tenantData);

        const unitRes = await fetch(
          `/api/apartment/find-unit/${tenantData.unit_id}`
        );
        const unitData = await unitRes.json();

        if (unitData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: unitData.errorMessage,
          });
          return;
        }

        setUnitDetail(unitData);
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
      <div className={`h-[calc(100vh-3.5rem)] flex`}>
        <Sidebar currentPage={"/owner-tenants"} />
        {showLoadingScreen ? (
          <Loading />
        ) : (
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* welcoming statement */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-apartments")}
              >
                Tenants
              </span>
              {">"}
              <h1> Tenant Detail</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                {tenantDetail.first_name +
                  " " +
                  tenantDetail.mid_name +
                  " " +
                  tenantDetail.last_name}
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showUpdateModal}
              >
                Edit Tenant
              </button>
            </div>

            {/* tenant details */}
            <div>
              <h1>{tenantDetail.email + " - " + tenantDetail.contact_num}</h1>
            </div>

            {/* tenant unit */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 h-fit`}
            >
              {/* search bar */}
              {/* <div className={`p-3`}>
                <form
                  className={`w-fit justify-self-end border-2 px-2 py-1 flex gap-3 rounded-md`}
                >
                  <input
                    type="text"
                    placeholder="Search Units"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div> */}

              {/* unit list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}
              >
                <h1>Name</h1>
                <h1>Rent</h1>
                <h1>Deposit</h1>
                <h1>Advance</h1>
                <h1>Balance</h1>

                {/* <h1>Status</h1> */}
              </div>

              {/* unit */}
              {tenantDetail.unit_id == null ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No units found
                </div>
              ) : (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-5 justify-between`}
                >
                  <h1>{unitDetail.apt_name + " - " + unitDetail.name}</h1>
                  <h1>{unitDetail.rent}</h1>
                  <h1>{unitDetail.deposit}</h1>
                  <h1>{unitDetail.advance}</h1>
                  <h1>{tenantDetail.balance}</h1>
                </div>
              )}
            </div>

            {/* tenant payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-80`}
            >
              {/* <div className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}>
                Bills
              </div> */}

              {/* search bar */}
              <div className={`p-3 flex items-center justify-between`}>
                <h1 className={`px-2 py-1 font-poppins font-semibold`}>Rent Invoices</h1>
                <form
                  className={`w-fit justify-self-end border-2 px-2 py-1 flex gap-3 rounded-md`}
                >
                  <input
                    type="text"
                    placeholder="Search Rent Payments"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div>

              {/* rent payment list */}
            </div>

            {/* water payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-80`}
            >
              {/* <div className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}>
                Bills
              </div> */}

              {/* search bar */}
              <div className={`p-3 flex items-center justify-between`}>
                <h1 className={`px-2 py-1 font-poppins font-semibold`}>Water Payments</h1>
                <form
                  className={`w-fit justify-self-end border-2 px-2 py-1 flex gap-3 rounded-md`}
                >
                  <input
                    type="text"
                    placeholder="Search Water Payments"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div>

              {/* water payment list */}
            </div>

            {/* electricity payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-80`}
            >
              {/* <div className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}>
                Bills
              </div> */}

              {/* search bar */}
              <div className={`p-3 flex items-center justify-between`}>
                <h1 className={`px-2 py-1 font-poppins font-semibold`}>Electricity Payments</h1>
                <form
                  className={`w-fit justify-self-end border-2 px-2 py-1 flex gap-3 rounded-md`}
                >
                  <input
                    type="text"
                    placeholder="Search Electricity Payments"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div>

              {/* electricity payment list */}
            </div>

            {/* feedback */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-80`}
            >
              {/* <div className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}>
                Bills
              </div> */}

              {/* search bar */}
              <div className={`p-3 flex items-center justify-between`}>
                <h1 className={`px-2 py-1 font-poppins font-semibold`}>Feedbacks</h1>
                <form
                  className={`w-fit justify-self-end border-2 px-2 py-1 flex gap-3 rounded-md`}
                >
                  <input
                    type="text"
                    placeholder="Search Feedbacks"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div>

              {/* feedbacklist */}
            </div>

            {/* last div */}
          </div>
        )}
      </div>

      {/* Update Modal */}
      {updateModal ? (
        <UpdateTenant showUpdateModal={showUpdateModal} tenantId={tenant_id} />
      ) : null}
    </>
  );
};

export default TenantDetail;
