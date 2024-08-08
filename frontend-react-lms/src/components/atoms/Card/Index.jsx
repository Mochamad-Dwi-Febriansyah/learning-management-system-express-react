import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ title,subtitle, value, bgIcon, icon, linkTo, kelas_id, mata_pelajaran_id  }) => {
  const handleNavLinkClick = () => {
    const kelasData = {
      kelas_id,
      mata_pelajaran_id
    };
    sessionStorage.setItem('kelas_data', JSON.stringify(kelasData));
  };
  return (
    <>
     
        <NavLink to={linkTo} onClick={handleNavLinkClick}>
          <div className="card rounded-1xl card-hover mb-2">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold text-secondary">
                      {title}
                    </p> 
                    <span className="fw-medium text-sm">{subtitle}</span>
                    <h5 className="font-weight-bolder mb-0">{value}</h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div
                    className={`icon icon-shape ${bgIcon} shadow-primary text-center rounded-circle`}
                  >
                    <i
                      className={`${icon} text-lg opacity-10`}
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
    
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.number,
  bgIcon: PropTypes.string,
  icon: PropTypes.string,
  linkTo: PropTypes.string,
  kelas_id: PropTypes.number,
  mata_pelajaran_id: PropTypes.number 
};

export default Card;
