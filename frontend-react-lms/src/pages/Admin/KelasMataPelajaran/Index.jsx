
import ManageLayout from "../../../components/layouts/ManageLayout.jsx";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import { useFetchKelasMataPelajaran } from "../../../features/Admin/KelasMataPelajaran/useFetchKelasMataPelajaran.js";
import { useDeleteKelasMataPelajaran } from "../../../features/Admin/KelasMataPelajaran/useDeleteKelasMataPelajaran.js";
import { useCreateKelasMataPelajaran } from "../../../features/Admin/KelasMataPelajaran/useCreateKelasMataPelajaran.js";
import { useEditKelasMataPelajaran } from "../../../features/Admin/KelasMataPelajaran/useEditKelasMataPelajaran.js";
import { useFetchKelas } from "../../../features/Admin/Kelas/useFetchKelas.js"; 
import { useFetchMataPelajaran } from "../../../features/Admin/MataPelajaran/useFetchMataPelajaran.js";
import { useFetchGuru } from "../../../features/Admin/Guru/useFetchGuru.js";

const KelasMataPelajaran = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
    const handleClose = () => {
        formik.resetForm()
        setShow(false)
    };
    const handleShow = (tipe) => {
        if (tipe.tipe == 'edit') {
            setTitle('Edit Kelas Mata Pelajaran')
        } else {
            setTitle('Add Kelas Mata Pelajaran')
        }
        setShow(true);
    }


    const formik = useFormik({
        initialValues: {
            id: "",  
            kelas_id: "",
            mata_pelajaran_id: "", 
            guru_id: "",
            created_by_id: "", 
            is_active: "",
            is_delete: "",
        },
        onSubmit: () => {
            // console.log("dsfsdfdfd")
            const { id, kelas_id, mata_pelajaran_id,guru_id,created_by_id,  is_active, is_delete } = formik.values 

            if (id) {
                editKelasMataPelajaran({
                    id,   
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id), 
                    guru_id: parseInt(guru_id), 
                    created_by_id: parseInt(created_by_id), 
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else { 
                createKelasMataPelajaran({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id), 
                    guru_id: parseInt(guru_id), 
                    created_by_id: parseInt(created_by_id), 
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
            formik.setFieldValue("id", 0)
            formik.setFieldValue("kelas_id", "")
            formik.setFieldValue("mata_pelajaran_id", "") 
            formik.setFieldValue("guru_id", "") 
            formik.setFieldValue("created_by_id", "") 
            formik.setFieldValue("is_active", "")
            formik.setFieldValue("is_delete", "")
        },
        validationSchema: yup.object().shape({
            kelas_id: yup.string().required(),
            mata_pelajaran_id: yup.string().required(),
            guru_id: yup.string().required(),
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

    const { mutate: createKelasMataPelajaran, isLoading: createKelasMataPelajaranIsLoading } = useCreateKelasMataPelajaran({
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
            refetchKelasMataPelajaran()
            handleClose()
        }
    })
    const { mutate: deleteKelasMataPelajaran } = useDeleteKelasMataPelajaran({
        onSuccess: () => {
            refetchKelasMataPelajaran()
        }
    })
    const { mutate: editKelasMataPelajaran, isLoading: editKelasMataPelajaranIsLoading } = useEditKelasMataPelajaran({
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
            refetchKelasMataPelajaran()
            handleClose()
        }
    })
    const { data, error, isLoading: kelasMataPelajaranIsLoading, refetch: refetchKelasMataPelajaran } = useFetchKelasMataPelajaran();

    const { data : dataKelas } = useFetchKelas();
    const { data : dataMataPelajaran  } = useFetchMataPelajaran();
    const { data : dataGuru  } = useFetchGuru();
    // console.log(dataKelas)


    const confirmationDelete = (id) => {
        const shouldDelete = confirm("Are you sure")

        if (shouldDelete) {
            deleteKelasMataPelajaran(id)
        }
    }

    const onEditClick = (kelasMataPelajaran) => {
        formik.setFieldValue("id", kelasMataPelajaran.id)
        formik.setFieldValue("kelas_id", kelasMataPelajaran.kelas_id)
        formik.setFieldValue("mata_pelajaran_id", kelasMataPelajaran.mata_pelajaran_id) 
        formik.setFieldValue("guru_id", kelasMataPelajaran.guru_id) 
        formik.setFieldValue("created_by_id", kelasMataPelajaran.created_by_id) 
        formik.setFieldValue("is_active", kelasMataPelajaran.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", kelasMataPelajaran.is_delete ? "true" : "false");

        handleShow({ tipe: 'edit' });
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const renderKelasMataPelajaran = () => {
        return data?.data.data.map((kelasMataPelajaran) => {
            return (
                <tr key={kelasMataPelajaran.id}>
                    <td><p className="text-xs text-dark mb-0">{kelasMataPelajaran.nama_kelas}</p></td>
                    <td><p className="text-xs text-dark mb-0">{kelasMataPelajaran.nama_mata_pelajaran}</p></td>
                    <td><p className="text-xs text-dark mb-0">{kelasMataPelajaran.nama_guru}</p></td>
                    <td><p className="text-xs text-dark mb-0">{kelasMataPelajaran.created_by}</p></td>
                    <td className="align-middle  text-sm">
                        {kelasMataPelajaran.is_active === true ? (
                            <span className="badge badge-sm bg-gradient-success">Active</span>
                        ) : (
                            <span className="badge badge-sm bg-gradient-secondary">Inactive</span>
                        )}
                    </td> 
                    <td className="align-middle text-center">
                        <button className="btn btn-link text-dark px-2 mb-0" onClick={() => onEditClick(kelasMataPelajaran)}><i className="fas fa-pencil-alt text-dark" aria-hidden="true"></i></button>
                        <button className="btn btn-link text-danger text-gradient px-2 mb-0" onClick={() => confirmationDelete(kelasMataPelajaran.id)}><i className="far fa-trash-alt " aria-hidden="true"></i></button>
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
                        <h6>List Kelas Mata Pelajaran</h6>
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
                                            Mata Pelajaran
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Guru
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Created By
                                        </th>
                                        <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                            Is Active
                                        </th> 
                                        <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderKelasMataPelajaran()}
                                    <tr className="text-center">
                                        <td> 
                                        {kelasMataPelajaranIsLoading ? <div className="spinner-border text-primary" role="status">
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
                                                            <label className="form-label">Mata Pelajaran</label>
                                                            {/* <input type="text" className={`form-control input-no-focus border-utama ${formik.errors.guru_id ? 'border-red' : ''}`} placeholder="Nama Kelas" aria-label="Nama Kelas" name="guru_id" onChange={handleFormInput} value={formik.values.created_by_id} /> */}
                                                            <select id="inputState" className={`form-control input-no-focus border-utama ${formik.errors.mata_pelajaran_id ? 'border-red' : ''}`} name="mata_pelajaran_id" onChange={handleFormInput} value={formik.values.mata_pelajaran_id} >
                                                            <option>Choose...</option>
                                                                {dataMataPelajaran?.data.data.map((mataPelajaran) => (
                                                                    <option key={mataPelajaran.id} value={mataPelajaran.id}>{mataPelajaran.nama}</option>  
                                                                ))}
                                                            </select>
                                                            {formik.errors.mata_pelajaran_id ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.mata_pelajaran_id}</span>
                                                            ) : backendErrors.mata_pelajaran_id ? (
                                                                <span className="text-danger fs-kecil">{backendErrors.mata_pelajaran_id}</span>
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
                                                            {formik.errors.mata_pelajaran_id ? (
                                                                <span className="text-danger fs-kecil">{formik.errors.mata_pelajaran_id}</span>
                                                            ) : backendErrors.mata_pelajaran_id ? (
                                                                <span className="text-danger fs-kecil">{backendErrors.mata_pelajaran_id}</span>
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
                                                    {createKelasMataPelajaranIsLoading || editKelasMataPelajaranIsLoading ? <div className="spinner-border text-primary" role="status">
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

export default KelasMataPelajaran;
