import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import SweetAlert from "../../assets/SweetAlert";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateTenant from "./UpdateTenant";
import { faCircleInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const TenantDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const tenant_id = pathname_array[3];

  const navigate = useNavigate();

  const [tenantDetail, setTenantDetail] = useState([]);
  const [unitDetail, setUnitDetail] = useState([]);

  const [rentDetail, setRentDetail] = useState([]);
  const rentDetail_statusSort = rentDetail.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  const [waterDetail, setWaterDetail] = useState([]);
  const waterDetail_statusSort = waterDetail.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  const [electricityDetail, setElectricityDetail] = useState([]);
  const electricityDetail_statusSort = electricityDetail.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  const [feedbackDetail, setFeedbackDetail] = useState([]);
  const feedbackDetail_statusSort = feedbackDetail.sort((a, b) =>
    b.status.localeCompare(a.status)
  );

  // shoudl be TRUE by default
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);

  const showUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  useEffect(() => {
    const fetchNeededDetails = async () => {
      try {
        const tenantRes = await fetch(`/api/owner/get-tenant/${tenant_id}`);
        const tenantData = await tenantRes.json();

        if (tenantData.success === false) {
          SweetAlert.fire({
            icon: "error",
            title: tenantData.errorMessage,
          });
          return;
        }
        setTenantDetail(tenantData);

        const unitRes = await fetch(
          `/api/apartment/find-unit/${tenantData.unit_id}`
        );
        const unitData = await unitRes.json();

        const rentRes = await fetch(
          `/api/rent/get-all-rents/${tenantData._id}`
        );
        const rentData = await rentRes.json();

        const waterRes = await fetch(
          `/api/bill/get-all-tenant-water/${tenantData._id}`
        );
        const waterData = await waterRes.json();

        const electricityRes = await fetch(
          `/api/bill/get-all-tenant-electricity/${tenantData._id}`
        );
        const electricityData = await electricityRes.json();

        const feedbackRes = await fetch(
          `/api/feedback/get-tenant-feedback/${tenantData._id}`
        );
        const feedbackData = await feedbackRes.json();

        if (
          unitData.success === false ||
          rentData.success === false ||
          waterData.success === false ||
          electricityData.success === false ||
          feedbackData.success === false
        ) {
          SweetAlert.fire({
            icon: "error",
            title:
              unitData.errorMessage ||
              rentData.errorMessage ||
              waterData.errorMessage ||
              electricityData.errorMessage ||
              feedbackData.errorMessage,
          });
          return;
        }

        setUnitDetail(unitData);
        setRentDetail(rentData);
        setWaterDetail(waterData);
        setElectricityDetail(electricityData);
        setFeedbackDetail(feedbackData);
        setShowLoadingScreen(false);
      } catch (error) {
        SweetAlert.fire({
          icon: "error",
          title: error,
        });
      }
    };

    fetchNeededDetails();
  }, [rentDetail, waterDetail, electricityDetail, feedbackDetail]);

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex`}>
        <Sidebar currentPage={"/owner-tenants"} />
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
                onClick={() => navigate("/owner-tenants")}
              >
                Tenants
              </span>
              {">"}
              <h1> Tenant Detail</h1>
            </div>

            {/* welcoming statement */}
            <div className={`mt-2 flex justify-between`}>
              <div
                className={`flex h-fit justify-start text-3xl text-black font-semibold font-poppins md:gap-2`}
              >
                {tenantDetail.first_name}{" "}
                <span className={`hidden md:inline`}>
                  {tenantDetail.mid_name}
                </span>{" "}
                {tenantDetail.last_name}
              </div>

              <button
                className={`p-2 bg-logo-blue hover:bg-logo-blue-gray text-logo-white font-nunito-sans text-sm rounded-md`}
                onClick={showUpdateModal}
              >
                Edit <span className={`hidden md:inline`}>Tenant</span>
              </button>
            </div>

            {/* tenant details */}
            <div className={`flex md:gap-1`}>
              <h1>{tenantDetail.email}</h1>{" "}
              <span className={`hidden md:inline`}>
                {" - " + tenantDetail.contact_num}
              </span>
            </div>

            {/* tenant unit */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 h-fit`}
            >
              {/* unit list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 md:grid-cols-5 justify-between`}
              >
                <h1>Name</h1>
                <h1>Rent</h1>
                <h1 className={`hidden md:inline`}>Deposit</h1>
                <h1 className={`hidden md:inline`}>Advance</h1>
                <h1>Balance</h1>

                {/* <h1>Status</h1> */}
              </div>

              {/* unit */}
              {tenantDetail.unit_id == null ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  No unit linked to this tenant.
                </div>
              ) : (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 md:grid-cols-5 justify-between`}
                >
                  <h1>{unitDetail.apt_name + " - " + unitDetail.name}</h1>
                  <h1>{unitDetail.rent}</h1>
                  <h1 className={`hidden md:inline`}>{unitDetail.deposit}</h1>
                  <h1 className={`hidden md:inline`}>{unitDetail.advance}</h1>
                  <h1>{tenantDetail.balance}</h1>
                </div>
              )}
            </div>

            {/* rent */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-3/5`}
            >
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}
              >
                Rent
              </div>

              {/* rent payment list */}
              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-3 justify-between`}
              >
                <h1>Due Date</h1>
                <h1>Status</h1>
                <h1>Amount</h1>
              </div>

              {rentDetail.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Nothing to pay yet.
                </div>
              ) : (
                rentDetail_statusSort.map((rent) => (
                  <div
                    key={rent._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-3 justify-between`}
                  >
                    <h1>{rent.due_date}</h1>
                    <h1
                      className={`${
                        rent.status == "Pending"
                          ? "text-yellow-500"
                          : rent.status == "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {rent.status}
                    </h1>

                    <div className={`flex justify-between`}>
                      <h1 className={``}>{rent.amount}</h1>

                      {rent.status == "Unpaid" ? null : (
                        <button
                          className={`text-blue-600 cursor-pointer flex items-center text-base`}
                          onClick={() =>
                            navigate(`/owner-rents/detail/${rent._id}`)
                          }
                          title="Details"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* water payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-3/5`}
            >
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}
              >
                Water
              </div>

              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-2 justify-between`}
              >
                <h1>Status</h1>
                <h1>Amount</h1>
              </div>

              {waterDetail.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Nothing to pay yet.
                </div>
              ) : (
                waterDetail_statusSort.map((water) => (
                  <div
                    key={water._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-2 justify-between `}
                  >
                    <h1
                      className={`${
                        water.status == "Pending"
                          ? "text-yellow-500"
                          : water.status == "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {water.status}
                    </h1>

                    <div className={`flex justify-between`}>
                      <h1>{water.amount}</h1>

                      <button
                        className={`text-blue-600 cursor-pointer flex items-center text-base`}
                        onClick={() => navigate(`/bill/detail/${water._id}`)}
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

            {/* electricity payments */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-3/5`}
            >
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}
              >
                Electricity
              </div>

              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-2 justify-between`}
              >
                <h1>Status</h1>
                <h1>Amount</h1>
              </div>

              {electricityDetail.length === 0 ? (
                <div
                  className={`p-3 font-nunito-sans md:text-base text-sm flex items-center justify-center `}
                >
                  Nothing to pay yet.
                </div>
              ) : (
                electricityDetail_statusSort.map((electricity) => (
                  <div
                    key={electricity._id}
                    className={`p-3 font-nunito-sans md:text-base text-sm grid grid-cols-2 justify-between `}
                  >
                    <h1
                      className={`${
                        electricity.status == "Pending"
                          ? "text-yellow-500"
                          : electricity.status == "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {electricity.status}
                    </h1>

                    <div className={`flex justify-between`}>
                      <h1>{electricity.amount}</h1>

                      <button
                        className={`text-blue-600 cursor-pointer flex items-center text-base`}
                        onClick={() =>
                          navigate(`/bill/detail/${electricity._id}`)
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

              {/* electricity payment list */}
            </div>

            {/* feedback */}
            <div
              className={`mt-7 bg-logo-white shadow-md rounded-md grid text-base font-nunito-sans divide-y-2 max-h-3/5`}
            >
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-5 justify-between`}
              >
                Feedback
              </div>

              {/* list title */}
              <div
                className={`p-3 font-poppins text-sm font-semibold grid grid-cols-2 justify-between`}
              >
                <h1>Status</h1>
                <h1>Title</h1>
              </div>

              {feedbackDetail_statusSort.map((feedback) => (
                <div
                  key={feedback._id}
                  className={`p-3 font-nunito-sans md:text-base text-sm justify-between grid grid-cols-2`}
                >
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
              ))}
              {/* feedbacklist */}
            </div>

            {/* last div */}
          </div>
        )}
      </div>

      {/* Update Modal */}
      {updateModal ? (
        <UpdateTenant showUpdateModal={showUpdateModal} tenantId={tenant_id} />
      ) : null}
    </>
  );
};

export default TenantDetail;
