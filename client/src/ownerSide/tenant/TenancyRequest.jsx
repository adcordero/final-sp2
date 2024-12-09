import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import Swal from "sweetalert2";
import SweetAlert from "../../assets/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import UpdateTenant from "./UpdateTenant";

const TenancyRequest = () => {
  const navigate = useNavigate();

  // should be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // tenants
  const [allTenants, setAllTenants] = useState([]);
  const allTenants_nameSort = allTenants.sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  const [updateModal, setUpdateModal] = useState(false);
  const [tenantId, setTenantId] = useState("");

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch(`/api/owner/get-tenancy-request`);

        const data = await res.json();

        if (data.success === false) {
          Swal.fire({
            icon: "error",
            title: data.errorMessage,
          });
          return;
        }

        setAllTenants(data);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [allTenants]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex `}>
        <Sidebar currentPage={"/owner-tenancy-request"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main body
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* welcoming statement */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-tenancy-request")}
              >
                Tenancy Request
              </span>
              {">"}
              <h1> All Tenancy Requests</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Tenancy Requests
              </div>

              {/* <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New Apartment
              </button> */}
            </div>

            {/* t request list */}
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
                    placeholder="Search Tenancy Requests"
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
                <h1>Tenant Name</h1>

                <h1>Email</h1>

                <h1>Contact Number</h1>
              </div>

              {/* list requests */}
              {allTenants.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  All tenants have been linked to a unit.
                </div>
              ) : (
                allTenants_nameSort.map((tenant) => (
                  <div
                    key={tenant._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1>{tenant.first_name + " " + tenant.last_name}</h1>

                    <h1 className={`truncate`} title={tenant.email}>
                      {tenant.email}
                    </h1>

                    <div className={`flex justify-between`}>
                      {tenant.contact_num}

                      <button
                        className={`text-blue-600 cursor-pointer flex gap-1 items-center text-base`}
                        onClick={() => {
                          showUpdateModal();
                          setTenantId(tenant._id);
                        }}
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        {/* <h1>Details</h1> */}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {updateModal ? (
        <UpdateTenant showUpdateModal={showUpdateModal} tenantId={tenantId} prevPage={"TenancyRequest"} />
      ) : null}
    </>
  );
};

export default TenancyRequest;
