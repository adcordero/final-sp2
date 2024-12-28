import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SweetAlert from "../assets/SweetAlert";
import Loading from "../assets/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const AddBillModal = ({ showAddModal, billType }) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Choose Tenant");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    amount: "",
    tenant_id: "",
    bill_proof: "",
    bill_type: billType,
    tenant_name: "",
  });

  const [allTenants, setAllTenants] = useState([]);
  const allTenants_nameSort = allTenants.sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const activeTenantsRes = await fetch(`/api/owner/get-all-tenants`);
        const activeTenantsData = await activeTenantsRes.json();

        // console.log(activeTenantsData);
        if (activeTenantsData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: activeTenantsData.errorMessage,
          });
          return;
        }

        setAllTenants(activeTenantsData);
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

  // handles changes made in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toString() });
  };

  // for apartment dropdown
  const dropdownChoice = (tenant) => {
    setButtonLabel(tenant.first_name + " " + tenant.last_name);
    setIsOpen(false);

    setFormData({
      ...formData,
      tenant_id: tenant._id.toString(),
      tenant_name: tenant.first_name + " " + tenant.last_name,
    });
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
    data.append("upload_preset", "final-sp2-bill");
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
        setUploading(false);
        return;
      }

      formData.bill_proof = uploadedData.url;

      const createBill = await fetch(`/api/bill/create-bill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const createdBillData = await createBill.json();

      if (createdBillData.success === false) {
        SweetAlert.fire({
          icon: "error",
          title: createdBillData.errorMessage,
        });
        setUploading(false);
        return;
      }

      setUploading(false);

      SweetAlert.fire({
        icon: "success",
        title: "Successfully created bill!",
      });

      showAddModal();
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
              {billType === "Water" ? (
                <h3 className={`text-3xl text-white font-semibold `}>
                  New Water Bill
                </h3>
              ) : (
                <h3 className={`text-3xl text-white font-semibold `}>
                  New Electricity Bill
                </h3>
              )}
              <button
                className={`ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none`}
                onClick={showAddModal}
              >
                ×
              </button>
            </div>

            {/* body */}
            <div className={`relative p-6 flex-auto`}>
              {showLoadingScreen ? (
                <Loading />
              ) : (
                <form
                  className={`w-full grid justify-self-center self-center gap-3`}
                >
                  <div className={`grid md:grid-cols-2 gap-3`}>
                    {/* choose unit */}
                    <label className={`grid gap-2`}>
                      <span
                        className={`text-base font-semibold font-poppins pl-1`}
                      >
                        Choose Tenant
                      </span>

                      <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={`border-2 border-black rounded-sm font-nunito-sans p-2 w-full flex items-center justify-between text-sm ${
                          buttonLabel == "Choose Tenant"
                            ? "text-gray-400"
                            : "text-black"
                        }`}
                      >
                        {buttonLabel}
                        {isOpen ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </div>

                      {isOpen && allTenants.length ? (
                        <div
                          className={`border-2 border-black rounded-sm font-nunito-sans p-2 w-full text-sm h-fit max-h-36 overflow-auto text-black`}
                        >
                          {allTenants_nameSort.map((tenant) => (
                            <div
                              key={tenant._id}
                              className={`grid justify-items-start p-1 content-center cursor-pointer hover:bg-logo-gray/50 hover:rounded-sm`}
                              onClick={() => dropdownChoice(tenant)}
                            >
                              {tenant.first_name} {tenant.last_name}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </label>

                    <label className={`grid gap-2`}>
                      <span
                        className={`text-base font-semibold font-poppins pl-1`}
                      >
                        Amount
                      </span>
                      <input
                        type="text"
                        placeholder="Amount"
                        id="amount"
                        className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <label className={`grid gap-2`}>
                    <span
                      className={`text-base font-semibold font-poppins pl-1`}
                    >
                      Utility Bill
                    </span>

                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      accept="image/*"
                    />
                  </label>
                </form>
              )}
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
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddBillModal;
