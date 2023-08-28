import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import "./Toaster.scss";

const Toaster = ({ showToast, setShowToast, message, type }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (showToast) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setShowToast(false);
      }, 2000); // Hide the toaster after 3 seconds
    }
  }, [showToast, setShowToast]);

  const toasterClass = `${"custom-toaster"} ${visible ? "show" : "hide"} ${type}`;

  return (
    <Toast className={toasterClass}>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Toaster;
