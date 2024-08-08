import PropTypes from "prop-types";

const Button = ({ children, ...props }) => {
  return (
    <>
      <button
        {...props}
        // data-bs-toggle={dataBsToggle}
        // data-bs-target={dataBsTarget}
      >
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
//   dataBsToggle: PropTypes.string,
//   dataBsTarget: PropTypes.string,
};

export default Button;
