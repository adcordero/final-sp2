import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import Swal from "sweetalert2";
import SweetAlert from "../../assets/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Name</h1>

                <h1>Contact Number</h1>

                <h1>Email</h1>
              </div>

              {/* list tenants */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TenantPage;
