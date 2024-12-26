import React, { useEffect, useState } from "react";
import SweetAlert from "../../assets/SweetAlert";

const RentReceiptModal = ({ showUpdateModal }) => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const rent_id = pathname_array[3];

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(undefined);

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
    data.append("upload_preset", "final-sp2-receipt");
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

      const updatedRent = await fetch(
        `/api/rent/update-rent-status/${rent_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: uploadedData.url,
          }),
        }
      );

      const updatedRentData = await updatedRent.json();

      if (updatedRentData.success === false) {
        SweetAlert.fire({
          icon: "error",
          title: updatedRentData.errorMessage,
        });
        return;
      }

      setUploading(false);

      SweetAlert.fire({
        icon: "success",
        title: "Receipt added successfully",
      });

      showUpdateModal();
    } catch (error) {
      SweetAlert.fire({
        icon: "error",
        title: error,
      });
      setUploading(false);
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
                Add Receipt
              </h3>
              <button
                className={`ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none`}
                onClick={showUpdateModal}
              >
                ×
              </button>
            </div>

            {/* body */}
            <div className={`relative p-6 flex-auto`}>
              <form>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  // ref={fileRef}
                  // hidden
                />
              </form>
            </div>

            {/* footer */}
            <div className="flex items-center justify-end p-3 rounded-b-lg">
              <button
                className="text-red-600 background-transparent font-bold font-nunito-sans uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={showUpdateModal}
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
          </div>
        </div>

        {/* last div */}
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default RentReceiptModal;
