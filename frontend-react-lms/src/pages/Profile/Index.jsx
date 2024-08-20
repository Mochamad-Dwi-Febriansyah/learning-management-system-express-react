import ManageLayout from "../../components/layouts/ManageLayout"
import { useFetchProfile } from "../../features/Auth/Setting/useFetchProfile.js";

const Profile = () => {

  const { data }  = useFetchProfile() 
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
                    src={data?.data.data.foto_profil}
                    alt="profile_image"
                    className="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">{data?.data.data.nama}</h5>
                  <p className="mb-0 font-weight-bold text-sm">
                  {data?.data.data.email}
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
                <button className="btn btn-primary btn-sm ms-auto"><i className="fas fa-pencil-alt text-white" aria-hidden="true"></i></button>
              </div>
            </div>
            <div className="card-body">
              <p className="text-uppercase text-sm">Informasi User</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Nama</label>
                    {/* <input className="form-control" type="text" value={data?.data.data.nama} /> */}
                    <p className="border rounded-3 p-2 fs-6 mb-0">{data?.data.data.nama} {data?.data.data.nama_akhir}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">NIS</label>
                    {/* <input className="form-control" type="text" value={data?.data.data.nama_akhir} /> */}
                    <p className="border rounded-3 p-2 fs-6 mb-0">{data?.data.data.nis}</p>
                  </div>
                </div> 
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Email</label>
                    {/* <input className="form-control" type="email" value={data?.data.data.email} /> */}
                    <p className="border rounded-3 p-2 fs-6 mb-0">{data?.data.data.email}</p>
                  </div>
                </div> 
              </div>
              <hr className="horizontal dark"/>
              <p className="text-uppercase text-sm">Informasi Kontak</p>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="example-text-input" className="form-control-label">Alamat</label>
                    {/* <input className="form-control" type="text" value={data?.data.data.alamat}/> */}
                    <p className="border rounded-3 p-2 fs-6 mb-0">{data?.data.data.alamat}</p>
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