import React, { useState } from "react";
import { useSelector } from "react-redux";
import SweetAlert from "../../assets/SweetAlert";

const AddFeedback = ({ showAddModal }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(undefined);

  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    unit_id: currentUser.unit_id,
    unit_name: currentUser.unit_name,
    apt_name: currentUser.apt_name,
    tenant_id: currentUser._id,
    tenant_name: currentUser.first_name + " " + currentUser.last_name,
    title: "",
    description: "",
  });

  // handles changes made in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      SweetAlert.fire({
        icon: "error",
        title: "Please select a file",
      });
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "final-sp2-feedback");
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      setUploading(true);
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedData = await uploadRes.json();
      // console.log(uploadedData.url);
      if (uploadedData.success === false) {
        SweetAlert.fire({
          icon: "error",
          title: uploadedData.errorMessage,
        });
        return;
      }

      //   const createdFeedback = await fetch(`/api/feedback/create-feedback`, {
      //     method: "POST",
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });
      //   const createdFeedbackData = await createdFeedback.json();

      //   if (createdFeedbackData.success === false) {
      //     SweetAlert.fire({
      //       icon: "error",
      //       title: createdFeedbackData.errorMessage,
      //     });
      //     return;
      //   }

      SweetAlert.fire({
        icon: "success",
        title: "Successfully created feedback!",
      });

      //   setUploading(false);
      //   showAddModal();
    } catch (error) {
      setUploading(false);
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
                Add Feedback
              </h3>
              <button
                className={`ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none`}
                onClick={showAddModal}
              >
                ×
              </button>
            </div>

            {/* body */}
            <div className={`relative p-6 flex-auto`}>
              <form
                className={`w-full grid justify-self-center self-center gap-3`}
              >
                {/* <label className={`grid gap-2`}>
                  <span className={`text-base font-semibold font-poppins pl-1`}>
                    Title
                  </span>
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    className={`focus:outline-none rounded-sm border-black border-2 p-2 text-base font-nunito-sans `}
                    onChange={handleChange}
                    required
                  />
                </label> */}

                {/* <label className={`grid gap-2`}>
                  <span className={`text-base font-semibold font-poppins pl-1`}>
                    Description
                  </span>
                  <textarea
                    className={`focus:outline-none rounded-sm border-black border-2 p-2 text-base font-nunito-sans `}
                    style={{ resize: "none" }}
                    rows={6}
                    id="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                  />
                </label> */}

                <label className={`grid gap-2`}>
                  <span className={`text-base font-semibold font-poppins pl-1`}>
                    Photo Upload
                  </span>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    // ref={fileRef}
                    // hidden
                  />
                </label>
              </form>
            </div>

            {/* footer */}
            <div className="flex items-center justify-end p-3 rounded-b-lg">
              <button
                className="text-red-600 background-transparent font-bold font-nunito-sans uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={showAddModal}
              >
                Close
              </button>

              <button
                className={`bg-logo-gray-blue text-white hover:bg-logo-blue-gray active:bg-logo-blue font-bold font-nunito-sans uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="button"
                onClick={handleSubmit}
              >
                {uploading ? "Uploading..." : "Add"}
              </button>
            </div>

            {/* last div */}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddFeedback;
