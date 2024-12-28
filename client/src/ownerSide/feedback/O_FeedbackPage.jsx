import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import { useSelector } from "react-redux";
import SweetAlert from "../../assets/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const O_FeedbackPage = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const navigate = useNavigate();

  const [unrepliedFB, setUnrepliedFB] = useState([]);
  const [repliedFB, setRepliedFB] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch("/api/feedback/get-unreplied-feedbacks");
        const data = await res.json();

        const repliedRes = await fetch("/api/feedback/get-replied-feedbacks");
        const repliedData = await repliedRes.json();

        if (data.success === false || repliedData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage || repliedData.errorMessage,
          });
          return;
        }

        setUnrepliedFB(data);
        setRepliedFB(repliedData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [unrepliedFB, repliedFB]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/owner-feedbacks"} />

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
                onClick={() => navigate("/owner-feedbacks")}
              >
                Feedback
              </span>
              {">"}
              <h1>List</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                Feedbacks
              </div>

              {/* <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                // onClick={showAddModal}
              >
                New Feedback
              </button> */}
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-96`}
            >
              {/* list title */}
              <div className={`p-3 font-poppins text-sm font-semibold`}>
                <h1>Unreplied</h1>
              </div>

              {/* list unreplied feedbacks */}
              {unrepliedFB.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  All feedbacks are replied to.
                </div>
              ) : (
                unrepliedFB.map((feedback) => (
                  <div
                    key={feedback._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm flex justify-between`}
                  >
                    <div>{feedback.title}</div>

                    {/* buttons */}
                    <div className={`flex gap-3`}>
                      {/* edit */}
                      <button
                        className={`text-blue-600 cursor-pointer flex items-center text-base`}
                        onClick={() =>
                          navigate(`/owner-feedbacks/detail/${feedback._id}`)
                        }
                        title="Details"
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                        {/* <h1>Edit</h1> */}
                      </button>

                      {/* delete */}
                      <button
                        className={`text-red-600 cursor-pointer flex gap-1 items-center text-base`}
                        // onClick={(e) => {
                        //   handleDeleteUnit(e, unit._id);
                        //   // setChosenUnitId(unit._id);
                        // }}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        {/* <h1>Edit</h1> */}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-96`}
            >
              {/* list title */}
              <div className={`p-3 font-poppins text-sm font-semibold`}>
                <h1>Replied</h1>
              </div>

              {/* list unreplied feedbacks */}
              {repliedFB.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No replies made to feedbacks.
                </div>
              ) : (
                repliedFB.map((feedback) => (
                  <div
                    key={feedback._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm flex justify-between`}
                  >
                    <div>{feedback.title}</div>

                    {/* buttons */}
                    <div className={`flex gap-3`}>
                      {/* edit */}
                      <button
                        className={`text-blue-600 cursor-pointer flex items-center text-base`}
                        onClick={() =>
                          navigate(`/owner-feedbacks/detail/${feedback._id}`)
                        }
                        title="Details"
                      >
                        <FontAwesomeIcon icon={faCircleInfo} />
                        {/* <h1>Edit</h1> */}
                      </button>

                      {/* delete */}
                      <button
                        className={`text-red-600 cursor-pointer flex gap-1 items-center text-base`}
                        // onClick={(e) => {
                        //   handleDeleteUnit(e, unit._id);
                        //   // setChosenUnitId(unit._id);
                        // }}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        {/* <h1>Edit</h1> */}
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
    </>
  );
};

export default O_FeedbackPage;
