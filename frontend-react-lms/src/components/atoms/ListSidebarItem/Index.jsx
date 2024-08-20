import { NavLink } from "react-router-dom";
import PropTypes from "prop-types"

const ListSidebarItem = ({linkTo, Icon, Text}) => {
  return (
    <>
      <li className="nav-item"> 
        <NavLink
          to={linkTo}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
            <i className={`${Icon} text-primary text-sm opacity-10`}></i>
          </div>
          <span className="nav-link-text ms-1">{Text}</span>
        </NavLink>
      </li>
    </>
  );
};

ListSidebarItem.propTypes = {
    linkTo: PropTypes.string,
    Icon:PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
}

export default ListSidebarItem;
