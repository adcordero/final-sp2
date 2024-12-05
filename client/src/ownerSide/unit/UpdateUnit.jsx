import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SweetAlert from "../../assets/SweetAlert";
import Loading from "../../assets/LoadingScreen";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateUnit = ({ showUpdateModal, chosenUnitId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  //   const [unitDetail, setUnitDetail] = useState([]);
  const [getAllApts, setAllApts] = useState([]);
  const getAllApts_nameSort = getAllApts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [isOpen, setIsOpen] = useState(false);

  const [prevApt, setPrevApt] = useState("");
  const [buttonLabel, setButtonLabel] = useState("");


  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch(`/api/apartment/find-unit/${chosenUnitId}`);
        const data = await res.json();

        const aptRes = await fetch(`/api/owner/get-apartments/${currentUser._id}`);
        const aptData = await aptRes.json();

        if (data.success === false || aptData.success === false) {
          // toast.error(data.errorMessage);
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });

          SweetAlert.fire({
            icon: "error",
            title: aptData.errorMessage,
          });
          return;
        }

        setFormData({
          name: data.name,
          description: data.description,
          rent: data.rent,
          apt_name: data.apt_name,
        });

        setPrevApt(data.apt_name);
        setButtonLabel(data.apt_name);
        setAllApts(aptData);
        setShowLoadingScreen(false);
      } catch (error) {
        // toast.error(error);
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
  const dropdownChoice = (apt) => {
    setButtonLabel(apt.name);
    setIsOpen(false);

    setFormData({
      ...formData,
      apt_id: apt._id.toString(),
      apt_name: apt.name.toString(),
    });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(chosenUnitId);

    const rent_num = parseInt(formData.rent, 10);

    formData.deposit = (rent_num * 2).toString();
    formData.advance = formData.rent;

    try {
      const res = await fetch(`/api/apartment/update-unit/${chosenUnitId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success == false) {
        // toast.error(data.errorMessage);
        SweetAlert.fire({
          icon: "error",
          title: data.errorMessage,
        });
        return;
      }

      // toast.success("Successfully updated unit!");
      SweetAlert.fire({
        icon: "success",
        title: "Successfully updated unit!",
      });
      showUpdateModal();
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
      {showLoadingScreen ? (
        <Loading />
      ) : (
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
                  Update Unit
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
                  <form
                    className={`w-full grid justify-self-center self-center gap-3`}
                  >
                    <div className={`grid md:grid-cols-2 gap-3`}>
                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Name
                        </span>
                        <input
                          type="text"
                          placeholder={formData.name}
                          id="name"
                          className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Description
                        </span>
                        <input
                          type="text"
                          placeholder={formData.description}
                          id="description"
                          className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>

                    {/* money */}
                    <div className={`grid md:grid-cols-2 gap-3`}>
                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Rent
                        </span>
                        <input
                          type="number"
                          placeholder={formData.rent}
                          id="rent"
                          className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Choose Apartment
                        </span>
                        <div
                          onClick={() => setIsOpen(!isOpen)}
                          className={`border-2 border-black rounded-sm font-nunito-sans p-2 w-full flex items-center justify-between text-sm ${
                            buttonLabel == prevApt
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

                        {isOpen && getAllApts.length ? (
                          <div
                            className={`border-2 border-black rounded-sm font-nunito-sans p-2 w-full text-sm h-fit max-h-36 overflow-auto text-black`}
                          >
                            {getAllApts_nameSort.map((apt) =>
                              apt.owner_id == currentUser._id ? (
                                <div
                                  key={apt._id}
                                  className={`grid justify-items-start p-1 content-center cursor-pointer hover:bg-logo-gray/50 hover:rounded-sm`}
                                  onClick={() => dropdownChoice(apt)}
                                >
                                  <span>{apt.name}</span>
                                </div>
                              ) : null
                            )}
                          </div>
                        ) : null}
                      </label>
                    </div>
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
                  // onClick={showAddModal}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateUnit;
