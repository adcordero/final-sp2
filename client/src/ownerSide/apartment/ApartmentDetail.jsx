import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSearch } from "@fortawesome/free-solid-svg-icons";

const ApartmentDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const apt_id = pathname_array[3];

  const navigate = useNavigate();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);

  const [aptDetail, setAptDetail] = useState([]);
  const [aptUnits, setAptUnits] = useState([]);
  const aptUnits_nameSort = aptUnits.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const aptRes = await fetch(`/api/apartment/find-apartment/${apt_id}`);
        const aptData = await aptRes.json();

        const unitsRes = await fetch(`/api/apartment/find-apt-units/${apt_id}`);
        const unitsData = await unitsRes.json();

        if (aptData.success === false || unitsData.success === false) {
          toast.error(aptData.errorMessage);
          toast.error(unitsData.errorMessage);
          return;
        }

        setAptDetail(aptData);
        setAptUnits(unitsData);
        setShowLoadingScreen(false);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchNeededDetails();
  }, [aptDetail, aptUnits]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex`}>
        <Sidebar currentPage={"/owner-apartments"} />

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
                onClick={() => navigate("/owner-apartments")}
              >
                Apartments
              </span>
              {">"}
              <h1> All Apartments</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                {aptDetail.name}
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showUpdateModal}
              >
                Edit Apartment
              </button>
            </div>

            {/* apartment details */}
            <div>
              <h1>{aptDetail.address}</h1>
            </div>

            {/* apartment units */}
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
                    placeholder="Search Units"
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
                <h1>Unit Name</h1>

                <h1>Description</h1>

                <h1>Status</h1>
              </div>

              {/* list units */}
              {aptUnits.length == 0 ? (
                <div className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}>
                    No units found
                </div>
              ) : (
                aptUnits_nameSort.map((unit) => (
                    <div
                      key={unit._id}
                      className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                    >
                        <h1>{unit.name}</h1>
    
                        <h1>{unit.description}</h1>
    
                        <div className={`flex justify-between`}>
                        {apt.status}
    
                        {/* <span className={`text-blue-600 cursor-pointer hover:underline`}>View Details</span> */}
                        <button
                          className={`text-blue-600 cursor-pointer flex gap-1 items-center hover:underline`}
                        //   onClick={() =>
                        //     navigate(`/owner-apartments/detail/${unit._id}`)
                        //   }
                        >
                          <FontAwesomeIcon icon={faCircleInfo} />
                          <h1>Details</h1>
                        </button>
                      </div>
                    </div>
                  ))
              ) }
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ApartmentDetail;
