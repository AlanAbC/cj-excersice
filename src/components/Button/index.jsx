import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Button = (props) => {
  const { children, disabled } = props;
  return (
    <button
      className={`button ${disabled ? "disabled" : ""}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
export default Button;
