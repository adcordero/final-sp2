import React, { useEffect, useState } from "react";
import SweetAlert from "../../assets/SweetAlert";
import Loading from "../../assets/LoadingScreen";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateTenant = ({ showUpdateModal, tenantId, prevPage }) => {
  const [formData, setFormData] = useState({});
  const [allUnits, setAllUnits] = useState([]);
  const allUnits_nameSort = allUnits.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [isOpen, setIsOpen] = useState(false);

  const [prevUnit, setPrevUnit] = useState("");
  const [buttonLabel, setButtonLabel] = useState("");

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const res = await fetch(`/api/owner/get-tenant/${tenantId}`);
        const data = await res.json();

        const unitRes = await fetch(`/api/apartment/get-vacant-units`);
        const unitData = await unitRes.json();

        if (data.success === false || unitData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: data.errorMessage,
          });

          SweetAlert.fire({
            icon: "error",
            title: unitData.errorMessage,
          });
          return;
        }

        setFormData({
          first_name: data.first_name,
          mid_name: data.mid_name,
          last_name: data.last_name,
          email: data.email,
          contact_num: data.contact_num,
          unit_name: data.unit_name,
        });

        setButtonLabel(data.unit_name);
        setPrevUnit(data.unit_name);
        setAllUnits(unitData);
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
  const dropdownChoice = (unit) => {
    setButtonLabel(unit.name);
    setIsOpen(false);

    setFormData({
      ...formData,
      unit_id: unit._id.toString(),
      unit_name: unit.name.toString(),
      rent: unit.rent.toString(),
    });
  };

  //   handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(tenantId)

    try {
      const res = await fetch(`/api/owner/update-tenant/${tenantId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
        title: "Successfully linked tenant to unit!",
      });

      showUpdateModal();
    } catch (error) {
      SweetAlert.fire({
        icon: "error",
        title: error,
      });
    }
  };

  return (
    <>
      {showLoadingScreen ? (
        <Loading
          className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none `}
        />
      ) : (
        // main body
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
                    Update Tenant
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
                    {/* name */}
                    <h1 className={`text-xl font-semibold font-poppins pl-1`}>
                      <span
                        className={`font-normal font-nunito-sans text-base`}
                      >
                        Tenant Name:{" "}
                      </span>
                      {formData.first_name +
                        " " +
                        formData.mid_name +
                        " " +
                        formData.last_name}
                    </h1>

                    <div className={`grid md:grid-cols-2 gap-3`}>
                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Email
                        </span>
                        <input
                          type="email"
                          placeholder={formData.email}
                          id="email"
                          className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                          onChange={handleChange}
                          required
                        />
                      </label>

                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Contact Number
                        </span>
                        <input
                          type="tel"
                          placeholder={formData.contact_num}
                          id="contact_num"
                          className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>

                    <div className={`grid md:grid-cols-2 gap-3`}>
                      {/* choose unit */}
                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Choose Unit
                        </span>

                        <div
                          onClick={() => setIsOpen(!isOpen)}
                          className={`border-2 border-black rounded-sm font-nunito-sans p-2 w-full flex items-center justify-between text-sm ${
                            buttonLabel == prevUnit
                              ? "text-gray-400"
                              : "text-black"
                          }`}
                        >
                          {buttonLabel == "" ? "Choose Unit" : buttonLabel}
                          {isOpen ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                          ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                          )}
                        </div>

                        {isOpen && allUnits.length ? (
                          <div
                            className={`border-2 border-black rounded-sm font-nunito-sans p-2 w-full text-sm h-fit max-h-36 overflow-auto text-black`}
                          >
                            {allUnits_nameSort.map((unit) => (
                              <div
                                key={unit._id}
                                className={`grid justify-items-start p-1 content-center cursor-pointer hover:bg-logo-gray/50 hover:rounded-sm`}
                                onClick={() => dropdownChoice(unit)}
                              >
                                {unit.name}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </label>

                      <label className={`grid gap-2`}>
                        <span
                          className={`text-base font-semibold font-poppins pl-1`}
                        >
                          Moved In Day
                        </span>
                        <input
                          type="number"
                          placeholder={formData.moved_in_day}
                          id="moved_in_day"
                          className={`focus:outline-none rounded-sm border-black border-2 p-2 text-sm font-nunito-sans `}
                          onChange={handleChange}
                          required
                        />
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default UpdateTenant;
