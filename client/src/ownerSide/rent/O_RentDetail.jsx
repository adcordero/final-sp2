import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../assets/SweetAlert";
import Loading from "../../assets/LoadingScreen";

const O_RentDetail = () => {
  const pathname = window.location.pathname;
  const pathname_array = pathname.split("/");
  const rent_id = pathname_array[3];

  return <div>O_RentDetail</div>;
};

export default O_RentDetail;
