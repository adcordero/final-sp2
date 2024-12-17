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
import UpdateApartment from "./UpdateApartment";
import UpdateUnit from "../unit/UpdateUnit";

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

  const [updateUnitModal, setUpdateUnitModal] = useState(false);
  const [chosenUnitId, setChosenUnitId] = useState("");

  const showUnitUpdateModal = () => {
    setUpdateUnitModal(!updateUnitModal);
  };

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
          // toast.error(aptData.errorMessage);
          SweetAlert.fire({
            icon: "error",
            title: aptData.errorMessage,
          });
          // toast.error(unitsData.errorMessage);
          SweetAlert.fire({
            icon: "error",
            title: unitsData.errorMessage,
          });
          return;
        }

        setAptDetail(aptData);
        setAptUnits(unitsData);
        setShowLoadingScreen(false);
      } catch (error) {
        // toast.error(error);
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
    // console.log(aptUnits);
  }, [aptDetail, aptUnits]);

  const handleDeleteUnit = async (e, unit_id) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "rgb(22 163 74)",
      cancelButtonColor: "rgb(220 38 38)",
      confirmButtonText: "Yes, delete it!",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/apartment/delete-unit/${unit_id}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (data.success === false) {
            SweetAlert.fire({
              icon: "error",
              title: data.errorMessage,
            });
          }

          SweetAlert.fire({
            icon: "success",
            title: data,
          });
        } catch (error) {
          SweetAlert.fire({
            icon: "error",
            title: error,
          });
        }
      }
    });
  };

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
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
              <h1> Apartment Detail</h1>
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
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-4 md:grid-cols-5 justify-between`}
              >
                <h1>Unit Name</h1>
                <h1 className={`hidden md:inline`}>Type</h1>
                <h1>Rent</h1>
                <h1>Deposit</h1>
                <h1>Advance</h1>

                {/* <h1>Status</h1> */}
              </div>

              {/* list units */}
              {aptUnits.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No units found
                </div>
              ) : (
                aptUnits_nameSort.map((unit) => (
                  <div
                    key={unit._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-4 md:grid-cols-5 justify-between`}
                  >
                    <h1
                      className={`${
                        unit.status == "Vacant"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      // onClick={() => {showDetailModal(); setChosenAptId(unit._id)}}
                    >
                      {unit.name}
                    </h1>

                    {/* <h1 className={`hidden md:inline`}>{unit.apt_name}</h1> */}
                    <h1 className={`hidden md:inline`}>{unit.description}</h1>
                    <h1>{unit.rent}</h1>
                    <h1>{unit.deposit}</h1>
                    {/* <h1>{unit.advance}</h1> */}
                    {/* <h1>{unit.apt_name}</h1> */}

                    <div className={`flex justify-between`}>
                      {unit.advance}

                      
                      {/* buttons */}
                      <div className={`flex gap-3`}>
                        {/* edit */}
                        <button
                          className={`text-blue-600 cursor-pointer flex items-center text-base`}
                          onClick={() => {
                            showUnitUpdateModal();
                            setChosenUnitId(unit._id);
                          }}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                          {/* <h1>Edit</h1> */}
                        </button>

                        {/* delete */}
                        <button
                          className={`text-red-600 cursor-pointer flex gap-1 items-center text-base`}
                          onClick={(e) => {
                            handleDeleteUnit(e, unit._id);
                            // setChosenUnitId(unit._id);
                          }}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          {/* <h1>Edit</h1> */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* update modal */}
      {updateModal ? (
        <UpdateApartment showUpdateModal={showUpdateModal} />
      ) : null}

      {/* update unit modal */}
      {updateUnitModal ? (
        <UpdateUnit
          showUpdateModal={showUnitUpdateModal}
          chosenUnitId={chosenUnitId}
        />
      ) : null}
    </>
  );
};

export default ApartmentDetail;
