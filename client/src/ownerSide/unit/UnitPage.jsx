import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import AddUnit from "./AddUnit";

const UnitPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [chosenUnitId, setChosenUnitId] = useState("");

  const showAddModal = () => {
    setAddModal(!addModal);
  };

  const showDetailModal = () => {
    setDetailModal(!detailModal);
  };

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  const [allUnits, setAllUnits] = useState([]);
  const allUnits_nameSort = allUnits.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const allUnits_statusSort = allUnits.sort((a, b) =>
    a.status.localeCompare(b.status)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const unitRes = await fetch(`/api/owner/get-units/${currentUser._id}`);
        const unitData = await unitRes.json();

        if (unitData.success == false) {
          toast.error(data.errorMessage);
          return;
        }

        setAllUnits(unitData);
        setShowLoadingScreen(false);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchNeededDetails();
  }, [allUnits]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex `}>
        <Sidebar currentPage={"/owner-units"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main body
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* tags */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-units")}
              >
                Units
              </span>
              {">"}
              <h1> All Units</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                House Units
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New Unit
              </button>
            </div>

            {/* unit list */}
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
              {allUnits.length == 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No units found
                </div>
              ) : (
                allUnits_statusSort.map((unit) => (
                  <div
                    key={unit._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1
                      className={`cursor-pointer hover:underline text-blue-600`}
                      onClick={() => {showDetailModal(); setChosenAptId(unit._id)}}
                    >
                      {unit.name}
                    </h1>

                    <h1>{unit.description}</h1>

                    <div className={`flex justify-between`}>
                      {unit.status}

                      {/* <span className={`text-blue-600 cursor-pointer hover:underline`}>View Details</span> */}
                      <button
                        className={`text-blue-600 cursor-pointer flex gap-1 items-center hover:underline`}
                        //   onClick={() =>
                        //     navigate(`/owner-apartments/detail/${unit._id}`)
                        //   }
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <h1>Edit</h1>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* create unit modal */}
      {addModal ? <AddUnit showAddModal={showAddModal} /> : null}
    </>
  );
};

export default UnitPage;
