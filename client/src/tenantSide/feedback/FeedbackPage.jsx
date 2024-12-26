import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import AddFeedback from "./AddFeedback";
import { useSelector } from "react-redux";
import SweetAlert from "../../assets/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

const FeedbackPage = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const [addModal, setAddModal] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const showAddModal = () => {
    setAddModal(!addModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const feedbackRes = await fetch(
          `/api/feedback/get-all-feedback/${currentUser._id}`
        );

        const feedbackData = await feedbackRes.json();

        if (feedbackData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: feedbackData.errorMessage,
          });
          return;
        }

        setAllFeedbacks(feedbackData);
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
      <div className={`h-[calc(100vh-3.5rem)] flex bg-logo-white`}>
        <Sidebar currentPage={"/tenant-feedback"} />

        {showLoadingScreen ? (
          <Loading />
        ) : (
          // main div
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            {/* welcoming statement */}
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              {/* <h1>Bills</h1>
              {">"} */}
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/tenant-feedback")}
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

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showAddModal}
              >
                New Feedback
              </button>
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-96`}
            >
              {/* list title */}
              <div className={`p-3 font-poppins text-sm font-semibold`}>
                <h1>Unresolved</h1>
              </div>

              {/* list feedbacks */}
              {allFeedbacks.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No feedbacks made yet.
                </div>
              ) : (
                allFeedbacks.map((feedback) =>
                  feedback.status === "Unresolved" ? (
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
                          //   onClick={() => navigate(`/tenant-rent/detail/${rent._id}`)}
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
                  ) : null
                )
              )}
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-96`}
            >
              {/* list title */}
              <div className={`p-3 font-poppins text-sm font-semibold`}>
                <h1>Resolved</h1>
              </div>

              {/* list feedbacks */}
              {allFeedbacks.map((feedback) =>
                feedback.status === "Resolved" ? (
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
                        //   onClick={() => navigate(`/tenant-rent/detail/${rent._id}`)}
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
                ) : null
              )}
            </div>

            {/* last main div */}
          </div>
        )}
      </div>
      {addModal ? <AddFeedback showAddModal={showAddModal} /> : null}
    </>
  );
};

export default FeedbackPage;
