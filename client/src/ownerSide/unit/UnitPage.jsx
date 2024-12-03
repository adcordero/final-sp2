import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";

const UnitPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const [addModal, setAddModal] = useState(false);

  const showAddModal = () => {
    setAddModal(!addModal);
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
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/owner-apartments")}
              >
                Units
              </span>
              {">"}
              <h1> All Units</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UnitPage;
