import PropTypes from "prop-types"

const Label = ({children, className, htmlFor}) => {
  return (
    <>
      <label htmlFor={htmlFor} className={className}>
        {children}
      </label>
    </>
  );
};

Label.propTypes ={
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    htmlFor: PropTypes.string
}

export default Label;
