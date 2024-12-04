import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/LoadingScreen";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faSearch } from "@fortawesome/free-solid-svg-icons";

const UnitDetail = ({ showDetailModal, chosenUnitId }) => {
  const [unitDetail, setUnitDetail] = useState([]);

  useEffect(() => {
    const fetchNeededDetails = async () => {};

    fetchNeededDetails();
  }, []);

  return <div>UnitDetail</div>;
};

export default UnitDetail;
