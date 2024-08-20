import Button from "../../../atoms/Home/Button/Index.jsx";
import Input from "../../../atoms/Home/Input/Index.jsx";
import Label from "../../../atoms/Home/Label/Index.jsx"; 
import List from "../../../molecules/Home/List/Index.jsx";
import PropTypes from "prop-types"

const Header = ({children}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-ligth shadow-none">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Ringkus
        </a>
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <List />
          <div className="px-0 py-2"> 
          <Button
            className="btn btn-warning text-light rounded-pill fw-medium"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Login
          </Button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Login
                  </h1>
                  <Button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  {children}
                </div> 
                <div className="modal-footer border-0 d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <Label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </Label>
                  </div>
                  <a href="">Lupa password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  children: PropTypes.node, 
}



export default Header;
