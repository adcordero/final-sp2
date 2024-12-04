import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import SweetAlert from "../../assets/SweetAlert";

const AddApartment = ({ showAddModal }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    owner_id: currentUser._id,
    // description: "",
  });

  // handles changes made in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };

  // handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/apartment/create-apartment`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        // toast.error(data.errorMessage);
        SweetAlert.fire({
          icon: "error",
          title: data.errorMessage,
        });
        return;
      }

      // toast.success("Successfully created apartment!");
      SweetAlert.fire({
        icon: "success",
        title: "Successfully created apartment!",
      });
      showAddModal();
    } catch (error) {
      // toast.error(error);
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
                New Apartment
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
                <label className={`grid gap-2`}>
                  <span className={`text-base font-semibold font-poppins pl-1`}>
                    Name
                  </span>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    className={`focus:outline-none rounded-sm border-black border-2 p-2 text-base font-nunito-sans `}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className={`grid gap-2`}>
                  <span className={`text-base font-semibold font-poppins pl-1`}>
                    Address
                  </span>
                  <input
                    type="text"
                    placeholder="Address"
                    id="address"
                    className={`focus:outline-none rounded-sm border-black border-2 p-2 text-base font-nunito-sans `}
                    onChange={handleChange}
                    required
                  />
                </label>

                {/* <label className={`grid gap-2`}>
                  <span className={`text-base font-semibold font-poppins pl-1`}>
                    Description
                  </span>
                  <input
                    type="text"
                    placeholder="Description"
                    id="description"
                    className={`focus:outline-none rounded-sm border-black border-2 p-2 text-base font-nunito-sans `}
                    onChange={handleChange}
                    required
                  />
                </label> */}
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
                // onClick={showAddModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddApartment;
