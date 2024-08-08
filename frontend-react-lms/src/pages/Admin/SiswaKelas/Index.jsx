
import ManageLayout from "../../../components/layouts/ManageLayout.jsx";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import { useFetchSiswaKelas } from "../../../features/Admin/SiswaKelas/useFetchSiswaKelas.js";
import { useDeleteSiswaKelas } from "../../../features/Admin/SiswaKelas/useDeleteSiswaKelas.js";
import { useCreateSiswaKelas } from "../../../features/Admin/SiswaKelas/useCreateSiswaKelas.js";
import { useEditSiswaKelas } from "../../../features/Admin/SiswaKelas/useEditSiswaKelas.js";
import { useFetchKelas } from "../../../features/Admin/Kelas/useFetchKelas.js";
import { useFetchGuru } from "../../../features/Admin/Guru/useFetchGuru.js";

const SiswaKelas = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
    const handleClose = () => {
        formik.resetForm()
        setShow(false)
    };
    const handleShow = (tipe) => {
        if (tipe.tipe == 'edit') {
            setTitle('Edit Siswa Kelas')
        } else {
            setTitle('Add Siswa Kelas')
        }
        setShow(true);
    }


    const formik = useFormik({
        initialValues: {
            id: "", 
            kelas_id: "",
            siswa_id: "", 
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {
            console.log("dsfsdfdfd")
            const { id, kelas_id, siswa_id,  is_active, is_delete } = formik.values
            console.log(formik.values)

            if (id) {
                editSiswaKelas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    siswa_id: parseInt(siswa_id), 
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                console.log("sdfdsf")
                createSiswaKelas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    siswa_id: parseInt(siswa_id), 
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
            formik.setFieldValue("id", 0)
            formik.setFieldValue("kelas_id", "")
            formik.setFieldValue("siswa_id", "") 
            formik.setFieldValue("is_active", "")
            formik.setFieldValue("is_delete", "")
        },
        validationSchema: yup.object().shape({
            kelas_id: yup.string().required(),
            siswa_id: yup.string().required(), 
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
        })


    })


    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)

    }

    const [backendErrors, setBackendErrors] = useState({});

    const { mutate: createSiswaKelas, isLoading: createSiswaKelasIsLoading } = useCreateSiswaKelas({
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
            refetchSiswaKelas()
            handleClose()
        }
    })
    const { mutate: deleteSiswaKelas } = useDeleteSiswaKelas({
        onSuccess: () => {
            refetchSiswaKelas()
        }
    })
    const { mutate: editSiswaKelas, isLoading: editSiswaKelasIsLoading } = useEditSiswaKelas({
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
            refetchSiswaKelas()
            handleClose()
        }
    })
    const { data, error, isLoading: siswaKelasIsLoading, refetch: refetchSiswaKelas } = useFetchSiswaKelas();

    const { data : dataKelas } = useFetchKelas();
    const { data : dataGuru  } = useFetchGuru();
    // console.log(dataKelas)


    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deleteSiswaKelas(id)
        }
    }

    const onEditClick = (siswaKelas) => {
        formik.setFieldValue("id", siswaKelas.id)
        formik.setFieldValue("kelas_id", siswaKelas.kelas_id)
        formik.setFieldValue("guru_id", siswaKelas.guru_id) 
        formik.setFieldValue("is_active", siswaKelas.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", siswaKelas.is_delete ? "true" : "false");

        handleShow({ tipe: 'edit' });
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const renderSiswaKelas = () => {
        return data?.data.data.map((siswaKelas) => {
            return (
                <tr key={siswaKelas.id}>
                    <td><p className="text-xs text-dark mb-0">{siswaKelas.nama_kelas}</p></td>
                    <td><p className="text-xs text-dark mb-0">{siswaKelas.nama_siswa}</p></td>
                    <td><p className="text-xs text-dark mb-0">{siswaKelas.nis_siswa}</p></td>
                    <td className="align-middle  text-sm">
                        {siswaKelas.is_active === true ? (
                            <span className="badge badge-sm bg-gradient-success">Active</span>
                        ) : (
                            <span className="badge badge-sm bg-gradient-secondary">Inactive</span>
                        )}
                    </td> 
                    <td className="align-middle text-center">
                        <button className="btn btn-link text-dark px-2 mb-0" onClick={() => onEditClick(siswaKelas)}><i className="fas fa-pencil-alt text-dark" aria-hidden="true"></i></button>
                        <button className="btn btn-link text-danger text-gradient px-2 mb-0" onClick={() => confirmationDelete(siswaKelas.id)}><i className="far fa-trash-alt " aria-hidden="true"></i></button>
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
                        <h6>List Siswa Kelas</h6>
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
                                            Siswa
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            NIS
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Is Active
                                        </th> 
                                        <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderSiswaKelas()}
                                    <tr className="text-center">
                                    <td>  
                                        {siswaKelasIsLoading ? <div className="spinner-border text-primary" role="status">
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
                                                    {createSiswaKelasIsLoading || editSiswaKelasIsLoading ? <div className="spinner-border text-primary" role="status">
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

export default SiswaKelas;
