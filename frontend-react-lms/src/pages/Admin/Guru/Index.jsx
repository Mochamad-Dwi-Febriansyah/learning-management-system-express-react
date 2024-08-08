 
import ManageLayout from "../../../components/layouts/ManageLayout.jsx";
import { useState } from "react"; 
import { useFormik } from "formik";
import * as yup from "yup" 
import { useFetchGuru } from "../../../features/Admin/Guru/useFetchGuru.js";
import { useDeleteGuru } from "../../../features/Admin/Guru/useDeleteGuru.js";
import { useCreateGuru } from "../../../features/Admin/Guru/useCreateGuru.js";
import { useEditGuru } from "../../../features/Admin/Guru/useEditGuru.js";

const Guru = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
    const handleClose = () => {
        formik.resetForm()
        setShow(false)
    };
    const handleShow = (tipe) => {
        if (tipe.tipe == 'edit') {
            setTitle('Edit Wali Kelas')
        } else {
            setTitle('Add Wali Kelas')
        }
        setShow(true);
    }


    const formik = useFormik({
        initialValues : {
            id: "",
            nama: "",
            nama_akhir: "",
            nis: "",
            nomor_hp: "",
            tanggal_lahir: "",
            jenis_kelamin: "",
            agama: "",
            alamat: "",
            user_type: "",
            is_active: "",
            is_delete: "",
            email: "",
            password: "" 
        },
        onSubmit: () => {
            const {id,nis,nama,nama_akhir,email,password,jenis_kelamin,tanggal_lahir,agama,nomor_hp,foto_profil,alamat,user_type,is_active,is_delete  } = formik.values
            // console.log(formik.values)

            if(id){     
                editGuru({
                    id, 
                    nama,
                    nama_akhir,
                    nis: parseInt(nis),
                    nomor_hp,
                    foto_profil,
                    tanggal_lahir,
                    jenis_kelamin,
                    agama,
                    alamat,
                    user_type,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                    email,
                    password 
                })
            }else{
                createGuru({
                    id, 
                    nama,
                    nama_akhir,
                    nis: parseInt(nis),
                    nomor_hp,
                    foto_profil,
                    tanggal_lahir,
                    jenis_kelamin,
                    agama,
                    alamat,
                    user_type,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                    email,
                    password 
                })
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required(),
            nama_akhir: yup.string().required(),
            nis: yup.number().required(),
            nomor_hp: yup.string().required(),
            tanggal_lahir: yup.date(),
            jenis_kelamin: yup.string().required(),
            agama: yup.string().required(),
            alamat: yup.string().required(),
            user_type: yup.string().required(),
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().min(6).max(15).required() 
        })

    })

    const handleFormInput = (event) => {
        const { target } = event 
        formik.setFieldValue(target.name, target.value)

    }

    const [backendErrors, setBackendErrors] = useState({});
 
    const { mutate: createGuru, isLoading: createGuruIsLoading } = useCreateGuru({
        onError: (error) => { 
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        }, 
        onSuccess: () => {
            setBackendErrors({})
            refetchGuru()
            handleClose()
          }
    })
    const { mutate: deleteGuru } = useDeleteGuru({
        onSuccess: () => {
            refetchGuru()
          }
    })
    const { mutate: editGuru,isLoading: editGuruIsLoading } = useEditGuru({
        onError: (error) => { 
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
        },
        onSuccess: () => {
            setBackendErrors({})
            refetchGuru()
            handleClose()
        } 
    })
    const { data, error, isLoading: guruIsLoading,  refetch: refetchGuru } = useFetchGuru(); 


    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if(shouldDelete) { 
            deleteGuru(id)
        }
    }

    const onEditClick = (guru) => {
        console.log(guru)
        formik.setFieldValue("id", guru.id)
        formik.setFieldValue("nama", guru.nama) 
        formik.setFieldValue("nama_akhir", guru.nama_akhir) 
        formik.setFieldValue("nis", guru.nis) 
        formik.setFieldValue("nomor_hp", guru.nomor_hp) 
        formik.setFieldValue("tanggal_lahir", guru.tanggal_lahir)  
        formik.setFieldValue("agama", guru.agama) 
        formik.setFieldValue("alamat", guru.alamat) 
        formik.setFieldValue("jenis_kelamin", guru.jenis_kelamin) 
        formik.setFieldValue("user_type", guru.user_type) 
        formik.setFieldValue("is_active", guru.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", guru.is_delete ? "true" : "false");
        formik.setFieldValue("email", guru.email) 
        formik.setFieldValue("password", guru.password) 
         
        handleShow({ tipe: 'edit' });  
    } 

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const renderGuru = () => {
        return data?.data.data.map((guru) => {
            return (
                <tr key={guru.id}>
                    <td><p className="text-xs text-dark mb-0">{guru.nama} {guru.nama_akhir}</p></td>
                    <td><p className="text-xs text-dark mb-0">{guru.nis}</p></td>
                    <td><p className="text-xs text-dark mb-0">{guru.nomor_hp}</p></td>
                    <td><p className="text-xs text-dark mb-0">{guru.tanggal_lahir}</p></td>
                    <td><p className="text-xs text-dark mb-0">{guru.email}</p></td>
                    <td><p className="text-xs text-dark mb-0">{guru.alamat}</p></td>
                    <td className="align-middle text-center">
                        <button className="btn btn-link text-dark px-2 mb-0" onClick={() => onEditClick(guru)}><i className="fas fa-pencil-alt text-dark" aria-hidden="true"></i></button>
                        <button className="btn btn-link text-danger text-gradient px-2 mb-0" onClick={() => confirmationDelete(guru.id) }><i className="far fa-trash-alt " aria-hidden="true"></i></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <ManageLayout>
                <div className="card mb-4">
                    <div className="card-header pb-0 d-flex">
                        <h6>List Guru</h6>
                        <a className="btn btn-link text-indigo px-2 mb-0 ms-auto" onClick={() => handleShow({ tipe: 'add' })}><i className="fas fa-plus text-indigo" aria-hidden="true"></i></a>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0"> 
                            <table className="table align-items-center m-3">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Nama
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            NIS
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Nomor HP
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Tanggal Lahir
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Email
                                        </th>
                                        <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Alamat
                                        </th>
                                        <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderGuru()}
                                    <tr className="text-center">
                                        <td>
                                        {guruIsLoading ? <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : null}
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                            <div className={`modal fade modal-lg ${show ? 'show' : ''} modal-backdrop-manual`} style={{ display: show ? 'block' : 'none' } }>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="modal-header">
                                                <h6 className="modal-title" id="exampleModalLabel">{title && title}</h6> 
                                            </div>
                                            <div className="modal-body">
                                            <div className="mb-3">
                                                    <div className="row g-3">
                                                        <div className="col">
                                                        <label className="form-label">Nama</label>
                                                            <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.nama ? 'border-red' : ''}`} placeholder="First name" aria-label="First name" name="nama" onChange={handleFormInput} value={formik.values.nama}/>
                                                            {formik.errors.nama ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.nama}</span>
                                                            ) : backendErrors.nama ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.nama}</span>
                                                            ) :null}
                                                        </div>
                                                        <div className="col">
                                                        <label className="form-label">Nama Akhir</label>
                                                            <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.nama_akhir ? 'border-red' : ''}`} placeholder="Last name" aria-label="Last name" name="nama_akhir" onChange={handleFormInput} value={formik.values.nama_akhir}/>
                                                            {formik.errors.nama_akhir ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.nama_akhir}</span>
                                                            ) : backendErrors.nama_akhir ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.nama_akhir}</span>
                                                            ) :null}
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className="mb-3">
                                                    <div className="row g-3">
                                                        <div className="col">
                                                        <label className="form-label">NIS</label>
                                                            <input type="number" className={`form-control input-no-focus border-utama ${formik.errors.nis ? 'border-red' : ''}`} placeholder="NIS" aria-label="NIS" name="nis" onChange={handleFormInput} value={formik.values.nis}/>
                                                            {formik.errors.nis ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.nis}</span>
                                                            ) : backendErrors.nis ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.nis}</span>
                                                            ) :null}
                                                        </div>
                                                        <div className="col">
                                                        <label className="form-label">Nomor HP</label>
                                                            <input type="number" className={`form-control input-no-focus border-utama ${formik.errors.nomor_hp ? 'border-red' : ''}`} placeholder="Nomor HP" aria-label="Nomor HP" name="nomor_hp" onChange={handleFormInput} value={formik.values.nomor_hp}/>
                                                             {formik.errors.nomor_hp ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.nomor_hp}</span>
                                                            ) : backendErrors.nomor_hp ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.nomor_hp}</span>
                                                            ) :null}
                                                        </div>
                                                    <div className="col">
                                                        <label className="form-label">Tanggal Lahir</label>
                                                            <input type="date" className={`form-control input-no-focus border-utama ${formik.errors.tanggal_lahir ? 'border-red' : ''}`} placeholder="Tanggal Lahir" aria-label="Tanggal Lahir" name="tanggal_lahir" onChange={handleFormInput} value={formik.values.tanggal_lahir}/>
                                                             {formik.errors.tanggal_lahir ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.tanggal_lahir}</span>
                                                            ) : backendErrors.tanggal_lahir ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.tanggal_lahir}</span>
                                                            ) :null}
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="mb-3">
                                                <div className="row g-3"> 
                                                    <div className="col">
                                                        <label htmlFor="inputState" className="form-label">Jenis Kelamin</label>
                                                        <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.jenis_kelamin ? 'border-red' : ''}`} name="jenis_kelamin" onChange={handleFormInput} value={formik.values.jenis_kelamin}>
                                                        <option >Choose...</option>
                                                        <option value="LAKI">Laki</option>
                                                        <option value="PEREMPUAN">Perempuan</option>
                                                        </select> 
                                                             {formik.errors.jenis_kelamin ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.jenis_kelamin}</span>
                                                            ) : backendErrors.jenis_kelamin ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.jenis_kelamin}</span>
                                                            ) :null}
                                                    </div> 
                                                    <div className="col">
                                                        <label htmlFor="inputState" className="form-label">Agama</label>
                                                        <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.agama ? 'border-red' : ''}`} name="agama" onChange={handleFormInput}   value={formik.values.agama} >
                                                        <option >Choose...</option>
                                                        <option value="ISLAM">Islam</option>
                                                        <option value="KRISTEN">Kristen</option>
                                                        <option value="KATHOLIK">Katolik</option>
                                                        </select> 
                                                             {formik.errors.agama ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.agama}</span>
                                                            ) : backendErrors.agama ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.agama}</span>
                                                            ) :null}
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="inputState" className="form-label">User Tipe</label>
                                                        <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.user_type ? 'border-red' : ''}`} name="user_type" onChange={handleFormInput}  value={formik.values.user_type} >
                                                        <option >Choose...</option> 
                                                        <option value="GURU">Guru</option>
                                                        </select> 
                                                             {formik.errors.user_type ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.user_type}</span>
                                                            ) : backendErrors.user_type ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.user_type}</span>
                                                            ) :null}
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="inputState" className="form-label">Aktif</label>
                                                        <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.is_active ? 'border-red' : ''}`} name="is_active" onChange={handleFormInput}  value={formik.values.is_active} >
                                                        <option >Choose...</option>
                                                        <option value="true">Aktif</option>
                                                        <option value="false">NonAktif</option> 
                                                        </select> 
                                                             {formik.errors.is_active ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.is_active}</span>
                                                            ) : backendErrors.is_active ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.is_active}</span>
                                                            ) :null}
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="inputState" className="form-label">Delete</label>
                                                        <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.is_delete ? 'border-red' : ''}`} name="is_delete" onChange={handleFormInput}  value={formik.values.is_delete} >
                                                        <option >Choose...</option>
                                                        <option value="true">Delete</option>
                                                        <option value="false">NonDelete</option> 
                                                        </select> 
                                                             {formik.errors.is_delete ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.is_delete}</span>
                                                            ) : backendErrors.is_delete ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.is_delete}</span>
                                                            ) :null}
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Alamat</label>
                                                    <textarea className={`form-control input-no-focus border-utama ${formik.errors.alamat ? 'border-red' : ''}`} id="exampleFormControlTextarea1" rows="3" name="alamat" onChange={handleFormInput} value={formik.values.alamat}></textarea>
                                                        {formik.errors.alamat ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.alamat}</span>
                                                    ) : backendErrors.alamat ?(
                                                        <span className="text-danger fs-kecil">{backendErrors.alamat}</span>
                                                    ) :null}
                                                </div> 
                                                <div className="mb-3">
                                                    <div className="row g-3"> 
                                                        <div className="col">
                                                        <label className="form-label">Email</label>
                                                            <input type="email" className={`form-control input-no-focus border-utama ${formik.errors.email ? 'border-red' : ''}`} placeholder="Email" aria-label="Email" name="email" onChange={handleFormInput} value={formik.values.email}/>
                                                             {formik.errors.email ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.email}</span>
                                                            ) : backendErrors.email ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.email}</span>
                                                            ) :null}
                                                        </div>
                                                        <div className="col">
                                                        <label className="form-label">Password</label>
                                                            <input type="password" className={`form-control input-no-focus border-utama ${formik.errors.password ? 'border-red' : ''}`} placeholder="Password" aria-label="Password" name="password" onChange={handleFormInput}/>
                                                             {formik.errors.password ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.password}</span>
                                                            ) : backendErrors.password ?(
                                                                <span className="text-danger fs-kecil">{backendErrors.password}</span>
                                                            ) :null}
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                                <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                                    {createGuruIsLoading || editGuruIsLoading ? <div className="spinner-border text-primary" role="status">
                                                        {/* <span className="visually-hidden">Loading...</span> */}
                                                    </div> : 'Save changes'}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </ManageLayout>
        </>
    );
};

export default Guru;
