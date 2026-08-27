import React from "react";
import { Link } from "react-router-dom";

const RegistrationButton = ({
  text = "REGISTER NOW",
  className = "",
}) => {
  return (
    <Link
      to="/register"
      className={className}
    >
      {text}
    </Link>
  );
};

export default RegistrationButton;