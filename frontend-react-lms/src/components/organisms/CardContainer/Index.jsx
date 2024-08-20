import PropTypes from "prop-types";

const CardContainer = ({children, title, textColor}) => {
    return (
        <>
          <div className="container-fluid py-4">
            <div className="py-1 px-3">
              <h6 className={`font-weight-bolder ${textColor} mb-0`}>{title}</h6>
            </div>
            <div className="row mb-4"> 
              {children}
            </div> 
        </div> 
        </>
    )
}

CardContainer.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    textColor: PropTypes.string
}

export default CardContainer