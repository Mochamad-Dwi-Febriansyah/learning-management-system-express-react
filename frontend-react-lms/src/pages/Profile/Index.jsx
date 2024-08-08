import ManageLayout from "../../components/layouts/ManageLayout"

const Profile = () => {
    return (
        <>
        <ManageLayout>
        <div className="col-12">
        <div className="card mb-4">
          <div className="card-body p-3">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img
                    src="../assets/img/team-1.jpg"
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">Sayo Kravits</h5>
                  <p className="mb-0 font-weight-bold text-sm">
                    Public Relations
                  </p>
                </div>
              </div> 
            </div>
          </div>
        </div> 
      </div>
      <div className="col-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex align-items-center">
                <p className="mb-0">Edit Profile</p>
                <button className="btn btn-primary btn-sm ms-auto">Settings</button>
              </div>
            </div>
            <div className="card-body">
              <p className="text-uppercase text-sm">User Information</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Username</label>
                    <input className="form-control" type="text" value="lucky.jesse" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Email address</label>
                    <input className="form-control" type="email" value="jesse@example.com" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">First name</label>
                    <input className="form-control" type="text" value="Jesse" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Last name</label>
                    <input className="form-control" type="text" value="Lucky" />
                  </div>
                </div>
              </div>
              <hr className="horizontal dark"/>
              <p className="text-uppercase text-sm">Contact Information</p>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Address</label>
                    <input className="form-control" type="text" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">City</label>
                    <input className="form-control" type="text" value="New York"/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Country</label>
                    <input className="form-control" type="text" value="United States"/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Postal code</label>
                    <input className="form-control" type="text" value="437300"/>
                  </div>
                </div>
              </div>
              <hr className="horizontal dark"/>
              <p className="text-uppercase text-sm">About me</p>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">About me</label>
                    <input className="form-control" type="text" value="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ManageLayout>
        </>
    )
}

export default Profile