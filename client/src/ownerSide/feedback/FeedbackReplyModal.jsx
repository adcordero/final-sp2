import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SweetAlert from "../../assets/SweetAlert";

const FeedbackReplyModal = ({ showReplyModal, feedback_id }) => {
  //   const [uploading, setUploading] = useState(false);
  //   const [file, setFile] = useState(undefined);

  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    user_id: currentUser._id,
    reply: "",
    feedback_id: feedback_id,
  });

  // handles changes made in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`/api/feedback/reply-feedback/${feedback_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        const data = await res.json();

        if (data.success === false) {
            SweetAlert.fire({
                icon: "error",
                title: data.errorMessage,
            });
            return;
        }

        SweetAlert.fire({
            icon: "success",
            title: "Reply added successfully",
        });

        showReplyModal();
    } catch (error) {
      SweetAlert.fire({
        icon: "error",
        title: error,
      });
    }
  };

  return (
    <>
      <div
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none `}
      >
        <div className={`relative w-5/6 md:w-4/6 mx-auto max-w-3xl`}>
          <div
            className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-logo-white outline-none focus:outline-none`}
          >
            {/* header */}
            <div
              className={`flex items-center justify-between p-4 rounded-t-lg  bg-logo-blue font-poppins`}
            >
              <h3 className={`text-3xl text-white font-semibold `}>
                Add Reply
              </h3>
              <button
                className={`ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none`}
                onClick={showReplyModal}
              >
                ×
              </button>
            </div>

            {/* body */}
            <div className={`relative p-6 flex-auto`}>
              <label className={`grid gap-2`}>
                <span className={`text-base font-semibold font-poppins pl-1`}>
                  Reply
                </span>
                <textarea
                  className={`focus:outline-none rounded-sm border-black border-2 p-2 text-base font-nunito-sans `}
                  style={{ resize: "none" }}
                  rows={6}
                  id="reply"
                  placeholder="Reply"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            {/* footer */}
            <div className="flex items-center justify-end p-3 rounded-b-lg">
              <button
                className="text-red-600 background-transparent font-bold font-nunito-sans uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={showReplyModal}
              >
                Close
              </button>

              <button
                className={`bg-logo-gray-blue text-white hover:bg-logo-blue-gray active:bg-logo-blue font-bold font-nunito-sans uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FeedbackReplyModal;
