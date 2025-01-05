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

  const [allFB, setAllFB] = useState([]);
  const allFb_nameSort = allFB.sort((a, b) =>
    a.tenant_name.localeCompare(b.tenant_name)
  );
  const allFb_statusSort = allFb_nameSort.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch("/api/feedback/get-all-feedbacks");
        const data = await res.json();

        if (data.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });
          return;
        }

        setAllFB(data);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [allFB]);

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
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md max-h-3/5 rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Tenant Name</h1>
                <h1>Status</h1>
                <h1>Title</h1>
              </div>

              {/* list unreplied feedbacks */}
              {allFB.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  All feedbacks are replied to.
                </div>
              ) : (
                allFb_statusSort.map((feedback) => (
                  <div
                    key={feedback._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm justify-between grid grid-cols-3`}
                  >
                    <h1>{feedback.tenant_name}</h1>
                    <h1
                      className={`${
                        feedback.status == "Unresolved"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {feedback.status}
                    </h1>

                    {/* buttons */}
                    <div className={`flex justify-between`}>
                      <h1>{feedback.title}</h1>
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
