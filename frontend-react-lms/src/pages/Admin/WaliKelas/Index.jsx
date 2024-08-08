
import ManageLayout from "../../../components/layouts/ManageLayout.jsx";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import { useFetchWaliKelas } from "../../../features/Admin/WaliKelas/useFetchWaliKelas.js";
import { useDeleteWaliKelas } from "../../../features/Admin/WaliKelas/useDeleteWaliKelas.js";
import { useCreateWaliKelas } from "../../../features/Admin/WaliKelas/useCreateWaliKelas.js";
import { useEditWaliKelas } from "../../../features/Admin/WaliKelas/useEditWaliKelas.js";
import { useFetchKelas } from "../../../features/Admin/Kelas/useFetchKelas.js";
import { useFetchGuru } from "../../../features/Admin/Guru/useFetchGuru.js";

const WaliKelas = () => {
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
        initialValues: {
            id: "", 
            kelas_id: "",
            guru_id: "", 
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {
            console.log("dsfsdfdfd")
            const { id, kelas_id, guru_id,  is_active, is_delete } = formik.values
            console.log(formik.values)

            if (id) {
                editWaliKelas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    guru_id: parseInt(guru_id), 
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                console.log("sdfdsf")
                createWaliKelas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    guru_id: parseInt(guru_id), 
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
            formik.setFieldValue("id", 0)
            formik.setFieldValue("kelas_id", "")
            formik.setFieldValue("guru_id", "") 
            formik.setFieldValue("is_active", "")
            formik.setFieldValue("is_delete", "")
        },
        validationSchema: yup.object().shape({
            kelas_id: yup.string().required(),
            guru_id: yup.string().required(), 
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
        })


    })


    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)

    }

    const [backendErrors, setBackendErrors] = useState({});

    const { mutate: createWaliKelas, isLoading: createWaliKelasIsLoading } = useCreateWaliKelas({
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
            refetchWaliKelas()
            handleClose()
        }
    })
    const { mutate: deleteWaliKelas } = useDeleteWaliKelas({
        onSuccess: () => {
            refetchWaliKelas()
        }
    })
    const { mutate: editWaliKelas, isLoading: editWaliKelasIsLoading } = useEditWaliKelas({
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
            refetchWaliKelas()
            handleClose()
        }
    })
    const { data, error, isLoading: waliKelasIsLoading, refetch: refetchWaliKelas } = useFetchWaliKelas();

    const { data : dataKelas } = useFetchKelas();
    const { data : dataGuru  } = useFetchGuru();
    // console.log(dataKelas)


    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deleteWaliKelas(id)
        }
    }

    const onEditClick = (waliKelas) => {
        formik.setFieldValue("id", waliKelas.id)
        formik.setFieldValue("kelas_id", waliKelas.kelas_id)
        formik.setFieldValue("guru_id", waliKelas.guru_id) 
        formik.setFieldValue("is_active", waliKelas.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", waliKelas.is_delete ? "true" : "false");

        handleShow({ tipe: 'edit' });
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const renderWaliKelas = () => {
        return data?.data.data.map((waliKelas) => {
            return (
                <tr key={waliKelas.id}>
                    <td><p className="text-xs text-dark mb-0">{waliKelas.nama_kelas}</p></td>
                    <td><p className="text-xs text-dark mb-0">{waliKelas.nama_guru}</p></td>
                    <td className="align-middle  text-sm">
                        {waliKelas.is_active === true ? (
                            <span className="badge badge-sm bg-gradient-success">Active</span>
                        ) : (
                            <span className="badge badge-sm bg-gradient-secondary">Inactive</span>
                        )}
                    </td> 
                    <td className="align-middle text-center">
                        <button className="btn btn-link text-dark px-2 mb-0" onClick={() => onEditClick(waliKelas)}><i className="fas fa-pencil-alt text-dark" aria-hidden="true"></i></button>
                        <button className="btn btn-link text-danger text-gradient px-2 mb-0" onClick={() => confirmationDelete(waliKelas.id)}><i className="far fa-trash-alt " aria-hidden="true"></i></button>
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
                        <h6>List Wali Kelas</h6>
                        <a className="btn btn-link text-indigo px-2 mb-0 ms-auto" onClick={() => handleShow({ tipe: 'add' })}><i className="fas fa-plus text-indigo" aria-hidden="true"></i></a>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0">
                            <table className="table align-items-center m-3">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Kelas
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Guru
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Is Active
                                        </th> 
                                        <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderWaliKelas()}
                                    <tr className="text-center">
                                    <td>  
                                        {waliKelasIsLoading ? <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : null}
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                                            <label className="form-label">Kelas</label>
                                                            {/* <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.kelas_id ? 'border-red' : ''}`} placeholder="Nama Kelas" aria-label="Nama Kelas" name="kelas_id" onChange={handleFormInput} value={formik.values.kelas_id} /> */}
                                                            <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.kelas_id ? 'border-red' : ''}`} name="kelas_id" onChange={handleFormInput} value={formik.values.kelas_id} >
                                                            <option>Choose...</option>
                                                                {dataKelas?.data.data.map((kelas) => (
                                                                    <option key={kelas.id} value={kelas.id}>{kelas.nama}</option>  
                                                                ))}
                                                            </select>
                                                            {formik.errors.kelas_id ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.kelas_id}</span>
                                                            ) : backendErrors.kelas_id ? (
                                                                <span className="text-danger fs-kecil">{backendErrors.kelas_id}</span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Guru</label>
                                                            {/* <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.guru_id ? 'border-red' : ''}`} placeholder="Nama Kelas" aria-label="Nama Kelas" name="guru_id" onChange={handleFormInput} value={formik.values.created_by_id} /> */}
                                                            <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.guru_id ? 'border-red' : ''}`} name="guru_id" onChange={handleFormInput} value={formik.values.guru_id} >
                                                            <option>Choose...</option>
                                                                {dataGuru?.data.data.map((guru) => (
                                                                    <option key={guru.id} value={guru.id}>{guru.nama}</option>  
                                                                ))}
                                                            </select>
                                                            {formik.errors.guru_id ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.guru_id}</span>
                                                            ) : backendErrors.guru_id ? (
                                                                <span className="text-danger fs-kecil">{backendErrors.guru_id}</span>
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
                                                    {createWaliKelasIsLoading || editWaliKelasIsLoading ? <div className="spinner-border text-primary" role="status">
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

export default WaliKelas;
