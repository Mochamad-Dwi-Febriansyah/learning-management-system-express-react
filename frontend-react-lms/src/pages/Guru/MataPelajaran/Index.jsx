import ManageLayout from "../../../components/layouts/ManageLayout"
// import PdfImg from "../../../assets/img/pdf-24.png";
// import AssigmentImg from "../../../assets/img/Assignment.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik"
import { useFetchPostingan } from "../../../features/Guru/Postingan/useFetchPostingan.js";
import { useDeletePostingan } from "../../../features/Guru/Postingan/useDeletePostingan.js";
import { useCreatePostingan } from "../../../features/Guru/Postingan/useCreatePostingan.js";
import { useEditPostingan } from "../../../features/Guru/Postingan/useEditPostingan.js";
import * as yup from "yup"
import Cookies from "js-cookie"; 
import ModalInputPostingan from "../../../components/organisms/ModalInputPostingan/Index.jsx";

const GMataPelajaran = () => {
    const [show, setShow] = useState(false); 
    const [title, setTitle] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => {
        formik.resetForm()
        setShow(false)
        setOpenDropdownId(null)
    };
    const handleShow = (tipe) => {
        if (tipe.tipe == 'edit') {
            setTitle('Edit Postingan')
        } else {
            setTitle('Add Postingan')
        }
        setShow(true);
    }   
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };
 

    const [backendErrors, setBackendErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            id: "",
            kelas_id: "",
            mata_pelajaran_id: "",
            guru_id: "",
            nama: "",
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {
            const kd = sessionStorage.getItem("kelas_data")
            const kelas_data = JSON.parse(kd);
            const gid = Cookies.get('id')

            const guru_id = gid
            const kelas_id = kelas_data.kelas_id
            const mata_pelajaran_id = kelas_data.mata_pelajaran_id
            const { id, nama, is_active, is_delete } = formik.values

            if (id) {
                editPostingan({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    guru_id: parseInt(guru_id),
                    nama,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                createPostingan({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    guru_id: parseInt(guru_id),
                    nama,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required(),
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
        })
    })

    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)

    }

    const { mutate: createPostingan, isLoading: createPostinganIsLoading } = useCreatePostingan({
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
            refetchPostingan()
            handleClose()
            setOpenDropdownId(null)
        }
    })
    const { mutate: deletePostingan } = useDeletePostingan({
        onSuccess: () => {
            refetchPostingan()
            setOpenDropdownId(null)
        }
    })
    const { mutate: editPostingan, isLoading: editPostinganIsLoading } = useEditPostingan({
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
            refetchPostingan()
            handleClose() 
            setOpenDropdownId(null)
        }
    })

    const { data, isLoading: postinganIsLoading, refetch: refetchPostingan } = useFetchPostingan()

    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if(shouldDelete) { 
            deletePostingan(id)
        }
    } 

    const onEditClick = (postingan) => { 
        formik.setFieldValue("id", postingan.id) 
        formik.setFieldValue("kelas_id", postingan.kelas_id) 
        formik.setFieldValue("mata_pelajaran_id", postingan.mata_pelajaran_id) 
        formik.setFieldValue("guru_id", postingan.guru_id)  
        formik.setFieldValue("nama", postingan.nama)   
        formik.setFieldValue("is_active", postingan.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", postingan.is_delete ? "true" : "false");   

        handleShow({ tipe: 'edit' });
    } 

    const renderPostingan = () => {
        return data?.data.data.map((postingan) => {
            return (
                <div className="card mb-4 rounded-xl py-3" key={postingan.id}>
                    <div className="card-header py-2 d-flex align-items-center gap-2">
                        <h6 className="mb-0">{postingan.nama}</h6>
                        <p className="ms-auto text-xs text-secondary mb-0">{postingan.createdAt}</p>
                        <div className="custom-dropdown">
                        <span onClick={() => toggleDropdown(postingan.id)}>
                            <i className="fa fa-ellipsis-v fs-6" aria-hidden="true"></i>
                        </span>

                        {openDropdownId === postingan.id && (
                            <ul className="dropdown-menus mt-1"> 
                                <li className="menu-item">
                                    <span className="hover-text">Tugas</span>
                                    <i className="fas fa-plus text-dark m-0" aria-hidden="true"></i>
                                </li>
                                <li className="menu-item">
                                    <span className="hover-text">Materi</span>
                                    <i className="fas fa-plus text-dark m-0" aria-hidden="true"></i>
                                </li>
                                <li className="menu-item">
                                    <span className="hover-text">Lainnya</span>
                                    <i className="fas fa-plus text-dark m-0" aria-hidden="true"></i>
                                </li>
                                <li  onClick={() => onEditClick(postingan) }><i className="fas fa-pencil-alt text-dark m-0" aria-hidden="true"></i></li>
                                <li  onClick={() => confirmationDelete(postingan.id) }><i className="fas fa-trash-alt text-dark m-0" aria-hidden="true"></i></li>
                            </ul>
                        )}
                    </div> 

                    </div>
                    {/* <div className="card-body-container">
                        <div className="card-body px-0 pt-0 pb-2">
                            <p className="text-uppercase text-secondary px-4 py-3 mb-0 text-xxs font-weight-bolder opacity-7  border-bottom">
                                Author
                            </p>
                            <div className="d-flex px-4 py-3  border-bottom">
                                <NavLink to="/detail-tugas">
                                    <div className="d-flex flex-row justify-content-center gap-2">
                                        <div className="">
                                            <img src={AssigmentImg} alt="" />
                                        </div>
                                        <div>
                                            <h6 className="mb-0 text-sm">Miriam Eric</h6>
                                            <p className="text-xs text-secondary mb-0">
                                                miriam@creative-tim.com
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="d-flex  px-4 py-3 border-bottom">
                                <div className="d-flex flex-row justify-content-center gap-2">
                                    <div className="">
                                        <img src={PdfImg} alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-0 text-sm">Miriam Eric</h6>
                                        <p className="text-xs text-secondary mb-0">
                                            miriam@creative-tim.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex  px-4 py-3 flex-column justify-content-center">

                                <h6 className="mb-0 text-sm">Catatan</h6>
                                <p className="text-xs text-secondary mb-0">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industrys
                                    standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>

                            </div>
                        </div>
                    </div> */}
                </div>
            )
        })
    }

    return (
        <>
            <ManageLayout>
                <div className="col-12">
                    <div className="d-flex"> 
                        <a className="btn btn-link text-indigo px-3 mb-0 fs-5" onClick={() =>navigate(-1)}><i className="fa fa-arrow-left text-white" aria-hidden="true"></i></a>
                        <a className="btn btn-link text-indigo px-3 mb-0 ms-auto fs-5"onClick={() => handleShow({ tipe: 'add' })}><i className="fas fa-plus text-white" aria-hidden="true"></i></a>
                    </div>
                    {renderPostingan()}
                    {postinganIsLoading ? <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                    </div> : null}

                    <div className={`modal fade modal-lg ${show ? 'show' : ''} modal-backdrop-manual`} style={{ display: show ? 'block' : 'none' }}>
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
                                                    <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.nama ? 'border-red' : ''}`} placeholder="Nama" aria-label="Nama" name="nama" onChange={handleFormInput} value={formik.values.nama} />
                                                    {formik.errors.nama ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.nama}</span>
                                                    ) : backendErrors.nama ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.nama}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="row g-3">
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Aktif</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.is_active ? 'border-red' : ''}`} name="is_active" onChange={handleFormInput} value={formik.values.is_active} >
                                                        <option >Choose...</option>
                                                        <option value="true">Aktif</option>
                                                        <option value="false">NonAktif</option>
                                                    </select>
                                                    {formik.errors.is_active ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.is_active}</span>
                                                    ) : backendErrors.is_active ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_active}</span>
                                                    ) : null}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="inputState" className="form-label">Delete</label>
                                                    <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.is_delete ? 'border-red' : ''}`} name="is_delete" onChange={handleFormInput} value={formik.values.is_delete} >
                                                        <option >Choose...</option>
                                                        <option value="true">Delete</option>
                                                        <option value="false">NonDelete</option>
                                                    </select>
                                                    {formik.errors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{formik.errors.is_delete}</span>
                                                    ) : backendErrors.is_delete ? (
                                                        <span className="text-danger fs-kecil">{backendErrors.is_delete}</span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                        <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                            {createPostinganIsLoading || editPostinganIsLoading ? <div className="spinner-border text-primary" role="status">

                                            </div> : 'Save changes'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <ModalInputPostingan 
                     show={show}
                     title={title}
                     formik={formik}
                     handleClose={handleClose}
                     createPostinganIsLoading={createPostinganIsLoading}
                     editPostinganIsLoading={editPostinganIsLoading}
                     backendErrors={backendErrors}
                    />

                </div>
            </ManageLayout>
        </>
    )
}

export default GMataPelajaran