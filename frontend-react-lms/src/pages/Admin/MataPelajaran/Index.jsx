
import ManageLayout from "../../../components/layouts/ManageLayout.jsx";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import { useFetchMataPelajaran } from "../../../features/Admin/MataPelajaran/useFetchMataPelajaran.js";
import { useDeleteMataPelajaran } from "../../../features/Admin/MataPelajaran/useDeleteMataPelajaran.js";
import { useCreateMataPelajaran } from "../../../features/Admin/MataPelajaran/useCreateMataPelajaran.js";
import { useEditMataPelajaran } from "../../../features/Admin/MataPelajaran/useEditMataPelajaran.js";

const MataPelajaran = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
    const handleClose = () => {
        formik.resetForm()
        setShow(false)
    };
    const handleShow = (tipe) => {
        if (tipe.tipe == 'edit') {
            setTitle('Edit Mata Pelajaran')
        } else {
            setTitle('Add Mata Pelajaran')
        }
        setShow(true);
    }


    const formik = useFormik({
        initialValues: {
            id: "",
            nama: "",
            created_by_id: "",
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {
            const { id, nama, created_by_id, is_active, is_delete } = formik.values
            // console.log(formik.values)

            if (id) {
                editMataPelajaran({
                    id,
                    nama,
                    created_by_id: parseInt(created_by_id),
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                createMataPelajaran({
                    id,
                    nama,
                    created_by_id: parseInt(created_by_id),
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
            formik.setFieldValue("id", 0)
            formik.setFieldValue("nama", "")
            formik.setFieldValue("created_by_id", "")
            formik.setFieldValue("is_active", "")
            formik.setFieldValue("is_delete", "")
        },
        validationSchema: yup.object().shape({
            nama: yup.string().required(),
            created_by_id: yup.string().required(),
            is_active: yup.string().required(),
            is_delete: yup.string().required(),
        })


    })


    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)

    }

    const [backendErrors, setBackendErrors] = useState({});

    const { mutate: createMataPelajaran, isLoading: createMataPelajaranIsLoading } = useCreateMataPelajaran({
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
            refetchMataPelajaran()
            handleClose()
        }
    })
    const { mutate: deleteMataPelajaran } = useDeleteMataPelajaran({
        onSuccess: () => {
            refetchMataPelajaran()
        }
    })
    const { mutate: editMataPelajaran, isLoading: editMataPelajaranIsLoading } = useEditMataPelajaran({
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
            refetchMataPelajaran()
            handleClose()
        }
    })
    const { data, error, isLoading: mataPelajaranIsLoading, refetch: refetchMataPelajaran } = useFetchMataPelajaran();


    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deleteMataPelajaran(id)
        }
    }

    const onEditClick = (mataPelajaran) => {
        formik.setFieldValue("id", mataPelajaran.id)
        formik.setFieldValue("nama", mataPelajaran.nama)
        formik.setFieldValue("created_by_id", mataPelajaran.created_by_id)
        formik.setFieldValue("is_active", mataPelajaran.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", mataPelajaran.is_delete ? "true" : "false");

        handleShow({ tipe: 'edit' });
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const renderMataPelajaran = () => {
        return data?.data.data.map((mataPelajaran) => {
            return (
                <tr key={mataPelajaran.id}>
                    <td><p className="text-xs text-dark mb-0">{mataPelajaran.nama}</p></td>
                    <td><p className="text-xs text-dark mb-0">{mataPelajaran.created_by}</p></td>
                    <td className="align-middle  text-sm">
                        {mataPelajaran.is_active === true ? (
                            <span className="badge badge-sm bg-gradient-success">Active</span>
                        ) : (
                            <span className="badge badge-sm bg-gradient-secondary">Inactive</span>
                        )}
                    </td> 
                    <td className="align-middle text-center">
                        <button className="btn btn-link text-dark px-2 mb-0" onClick={() => onEditClick(mataPelajaran)}><i className="fas fa-pencil-alt text-dark" aria-hidden="true"></i></button>
                        <button className="btn btn-link text-danger text-gradient px-2 mb-0" onClick={() => confirmationDelete(mataPelajaran.id)}><i className="far fa-trash-alt " aria-hidden="true"></i></button>
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
                        <h6>List Mata Pelajaran</h6>
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
                                            Dibuat Oleh
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Is Active
                                        </th> 
                                        <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderMataPelajaran()}
                                    <tr className="text-center">
                                        <td>
                                        {mataPelajaranIsLoading ? <div className="spinner-border text-primary" role="status">
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
                                                            <label className="form-label">Nama</label>
                                                            <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.nama ? 'border-red' : ''}`} placeholder="Nama Kelas" aria-label="Nama Kelas" name="nama" onChange={handleFormInput} value={formik.values.nama} />
                                                            {formik.errors.nama ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.nama}</span>
                                                            ) : backendErrors.nama ? (
                                                                <span className="text-danger fs-kecil">{backendErrors.nama}</span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">Created By</label>
                                                            <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.created_by_id ? 'border-red' : ''}`} placeholder="Nama Kelas" aria-label="Nama Kelas" name="created_by_id" onChange={handleFormInput} value={formik.values.created_by_id} />
                                                            {formik.errors.created_by_id ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.created_by_id}</span>
                                                            ) : backendErrors.created_by_id ? (
                                                                <span className="text-danger fs-kecil">{backendErrors.created_by_id}</span>
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
                                                    {createMataPelajaranIsLoading || editMataPelajaranIsLoading ? <div className="spinner-border text-primary" role="status">
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

export default MataPelajaran;
