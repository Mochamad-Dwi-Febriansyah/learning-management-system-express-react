import PropTypes from "prop-types"

const Input = ({...props}) => {
  return (
    <>
      <input {...props}
      />
    </>
  );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    ariaDescribedby: PropTypes.string, 
    value: PropTypes.string,
    onChange: PropTypes.func, 
}
 

export default Input;
