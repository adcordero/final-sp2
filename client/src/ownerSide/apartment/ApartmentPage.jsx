import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faExpand,
  faPenToSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import AddApartment from "./AddApartment";

const ApartmentPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // should be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  //   modal states
  const [addModal, setAddModal] = useState(false);
  //   const [editModal, setEditModal] = useState(false);
  //   const [detailModal, setDetailModal] = useState(false);
  //   const [chosenAptId, setChosenAptId] = useState("");

  const showAddModal = () => {
    setAddModal(!addModal);
  };

  //   const showEditModal = () => {
  //     setEditModal(!editModal);
  //   };

  //   const showDetailModal = () => {

  //     setDetailModal(!detailModal);
  //   };

  const [allApartments, setAllApartments] = useState([]);
  const allApartments_nameSort = allApartments.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const allApartments_statusSort = allApartments.sort((a, b) =>
    a.status.localeCompare(b.status)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const apartmentRes = await fetch(
          `/api/owner/get-apartments/${currentUser._id}`
        );
        const apartmentData = await apartmentRes.json();
        // console.log(apartmentData);

        if (apartmentData.success == false) {
          toast.error(data.errorMessage);
          return;
        }

        setAllApartments(apartmentData);
        setShowLoadingScreen(false);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchNeededDetails();
  }, [allApartments]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex `}>
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
                Apartments
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New Apartment
              </button>
            </div>

            {/* apartment list */}
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
                    placeholder="Search Apartments"
                    className={`focus:outline-none w-48`}
                  />

                  <FontAwesomeIcon
                    icon={faSearch}
                    className={`place-self-center`}
                  />
                </form>
              </div>

              {/* <hr className={``} /> */}

              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Apartment Name</h1>

                <h1>Location</h1>

                <h1>Status</h1>
              </div>

              {/* list apartments */}
              {allApartments_statusSort.map((apt) => (
                <div
                  key={apt._id}
                  className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                >
                  {/* <h1
                    className={`cursor-pointer hover:underline text-blue-600`}
                    onClick={() => {showDetailModal(); setChosenAptId(apt._id)}}
                  >
                    {apt.name}
                  </h1> */}
                  <h1>{apt.name}</h1>

                  <h1>{apt.address}</h1>

                  <div className={`flex justify-between`}>
                    {apt.status}

                    {/* <span className={`text-blue-600 cursor-pointer hover:underline`}>View Details</span> */}
                    <button
                      className={`text-blue-600 cursor-pointer flex gap-1 items-center hover:underline`}
                      onClick={() =>
                        navigate(`/owner-apartments/detail/${apt._id}`)
                      }
                    >
                      <FontAwesomeIcon icon={faCircleInfo} />
                      <h1>Details</h1>
                    </button>
                  </div>

                  <span></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* modals */}
      {addModal ? <AddApartment showAddModal={showAddModal} /> : null}
    </>
  );
};

export default ApartmentPage;
