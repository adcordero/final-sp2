import React from 'react'
import { useSelector } from 'react-redux';
import SweetAlert from "../../assets/SweetAlert";

const PayRent = ({ showPayModal }) => {

    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        date: "",
        amount: "",
    });

  return (
    <div>PayRent</div>
  )
}

export default PayRent