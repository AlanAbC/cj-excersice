/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const InfoValidator = (WrappedComponent) => (props) => {
  const personalData = useSelector((state) => state.personalData);
  const navigate = useNavigate();

  useEffect(() => {
    if (personalData) {
      const { name, last_name, email, phone } = personalData;
      if (name === "" || last_name === "" || email === "" || phone === "") {
        navigate("/");
      }
    }
  }, [personalData]);

  return <WrappedComponent {...props} />;
};

export default InfoValidator;
