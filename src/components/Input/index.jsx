import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Input = (props) => {
  const { label, sublabel } = props;

  return (
    <div className="input-container">
      <p className="label">{label}</p>
      <input {...props} />
      <p className="sublabel">{sublabel}</p>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  sublabel: PropTypes.string,
};

Input.defaultProps = {
  label: "",
  sublabel: "",
};
export default Input;
