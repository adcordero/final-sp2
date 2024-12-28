import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../../assets/LoadingScreen";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";

const FeedbackDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const feedback_id = pathname_array[3];
  
  const navigate = useNavigate();

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [feedbackDetail, setFeedbackDetail] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch(
          `/api/feedback/get-one-feedback/${feedback_id}`
        );

        const data = await res.json();

        if (data.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });
          return;
        }

        setFeedbackDetail(data);
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
          <div
            className={`h-[calc(100vh-3.5rem)] overflow-auto p-6 w-full bg-logo-gray/50 rounded-tl-3xl`}
          >
            <div
              className={`flex h-fit justify-start text-sm text-zinc-500 font-nunito-sans gap-2`}
            >
              <span
                className={`cursor-pointer hover:text-logo-blue hover:underline`}
                onClick={() => navigate("/tenant-feedback")}
              >
                Feedback
              </span>
              {">"}
              <h1>Detail</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins`}
              >
                {feedbackDetail.title}
                {/* {rentDetail.amount} */}
              </div>

              
            </div>

            <div className={`h-fit w-full mt-7 grid md:grid-cols-2 gap-10`}>
              <div>
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Description
                  </h1>

                  <h1 className={`font-poppins text-sm py-1 px-2 truncate`}>
                    {feedbackDetail.description}
                  </h1>
                </div>
              </div>

              <div>
                <div className={`bg-logo-white p-2 rounded-md shadow-md`}>
                  <h1
                    className={`font-poppins text-sm py-1 px-2 text-zinc-500 truncate`}
                  >
                    Photo Uploaded
                  </h1>

                  {feedbackDetail.photo_url ? (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      <img
                        src={feedbackDetail.photo_url}
                        alt="photo uploaded"
                        className={`max-w-1/2 h-auto`}
                      />
                    </div>
                  ) : (
                    <div
                      className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                    >
                      No photo uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2`}
            >
              <div className={`p-3 font-poppins text-sm font-semibold`}>
                Owner's Reply
              </div>

              <div className={`p-3 font-nunito-sans md:text-base text-sm`}>
                {feedbackDetail.reply ? (
                  <div>reply</div>
                ) : (
                  <div
                    className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                  >
                    No reply yet.
                  </div>
                )}
              </div>
            </div>

            {/* last div of main body */}
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackDetail;
