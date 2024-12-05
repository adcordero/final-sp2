import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import Swal from "sweetalert2";
import SweetAlert from "../../assets/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

const TenantPage = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // should be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // tenants
  const [allTenants, setAllTenants] = useState([]);
  const allTenants_nameSort = allTenants.sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );
  const allTenants_apartmentSort = allTenants_nameSort.sort((a, b) =>
    a.apt_name.localeCompare(b.apt_name)
  );
  const allTenants_unitSort = allTenants_apartmentSort.sort((a, b) =>
    a.unit_name.localeCompare(b.unit_name)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch(`/api/owner/get-all-tenants`);
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
        <Sidebar currentPage={"owner-tenants"} />

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
                onClick={() => navigate("/owner-tenants")}
              >
                Tenants
              </span>
              {">"}
              <h1> All Tenants</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Tenants
              </div>

              {/* <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New Apartment
              </button> */}
            </div>

            {/* tenant list */}
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
                    placeholder="Search Tenants"
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
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-4 md:grid-cols-5 justify-between`}
              >
                <h1>Name</h1>

                <h1>Email</h1>

                <h1>Contact Number</h1>

                <h1 className={`hidden md:inline`}>Apartment</h1>

                <h1>Unit</h1>
              </div>

              {/* list tenants */}
              {allTenants.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Tenants are not linked to a unit.
                </div>
              ) : (
                allTenants_unitSort.map((tenant) =>
                  tenant.unit_id != "" ? (
                    <div
                      key={tenant._id}
                      className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-4 md:grid-cols-5  justify-between`}
                    >
                      <h1>
                        {tenant.first_name} {tenant.last_name}
                      </h1>

                      <h1>{tenant.email}</h1>

                      <h1>{tenant.contact_num}</h1>

                      <h1 className={`hidden md:inline`}>{tenant.apt_name}</h1>

                      <div className={`flex justify-between`}>
                        {tenant.unit_name}

                        {/* <span className={`text-blue-600 cursor-pointer hover:underline`}>View Details</span> */}

                        {/* buttons */}
                        <div className={`flex gap-3`}>
                          {/* edit */}
                          <button
                            className={`text-blue-600 cursor-pointer flex gap-1 items-center text-base`}
                            // onClick={() =>
                            //   navigate(`/owner-apartments/detail/${apt._id}`)
                            // }
                            title="Details"
                          >
                            <FontAwesomeIcon icon={faCircleInfo} />
                            {/* <h1>Details</h1> */}
                          </button>

                          {/* delete */}
                          <button
                            className={`text-red-600 cursor-pointer flex gap-1 items-center text-base`}
                            // onClick={(e) => {
                            //   handleDeleteApt(e, apt._id);
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
                  ) : null
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TenantPage;
