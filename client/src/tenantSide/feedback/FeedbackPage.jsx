import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import AddFeedback from "./AddFeedback";

const FeedbackPage = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const [addModal, setAddModal] = useState(false);

  const showAddModal = () => {
    setAddModal(!addModal);
  };

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
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
                {/* list title */}
                <div className={`p-3 font-poppins text-sm font-semibold`}>
                    <h1>Unresolved</h1>
                </div>
            </div>

            {/* last main div */}
          </div>
        )}
      </div>
      {
        addModal ? (
            <AddFeedback showAddModal={showAddModal} />
        ) : null
      }
    </>
  );
};

export default FeedbackPage;
