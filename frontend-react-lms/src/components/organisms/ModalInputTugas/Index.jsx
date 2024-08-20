import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types"
import { useParams } from 'react-router-dom';
import { useCreateTugas } from "../../../features/Guru/Tugas/useCreateTugas.js";

const ModalInputTugas = ({ postingan_id, show, handleClose, title, refetchPostingan }) => {
    const { mata_pelajaran_id } = useParams(); 
    const [backendErrors, setBackendErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            kelas_id: "",
            mata_pelajaran_id: "",
            postingan_id: "",
            judul_tugas: "",
            dokumen_tugas: null,
            deskripsi_tugas: "",
            tugas_tanggal: "",
            pengumpulan_mulai: "",
            pengumpulan_selesai: "",
            is_active: "",
            is_delete: ""
        },
        validationSchema: yup.object().shape({ 
            judul_tugas: yup.string().required(),
            dokumen_tugas: yup.mixed().required(),
            deskripsi_tugas: yup.string().required(),
            tugas_tanggal: yup.date().required(),
            pengumpulan_mulai: yup.date().required(),
            pengumpulan_selesai: yup.date().required()
        }),
        onSubmit: () => {
            const { id,judul_tugas,dokumen_tugas,deskripsi_tugas, tugas_tanggal,  pengumpulan_mulai,  pengumpulan_selesai, is_active, is_delete } = formik.values
            // console.log(formik.values)
            const kd = sessionStorage.getItem("kelas_data")
            const kelas_data = JSON.parse(kd);   
            const kelas_id = kelas_data.kelas_id 

            if (id) {
                editTugas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    postingan_id: parseInt(postingan_id),
                    judul_tugas,
                    dokumen_tugas,
                    deskripsi_tugas,
                    tugas_tanggal,
                    pengumpulan_mulai,
                    pengumpulan_selesai,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            } else {
                createTugas({
                    id,
                    kelas_id: parseInt(kelas_id),
                    mata_pelajaran_id: parseInt(mata_pelajaran_id),
                    postingan_id: parseInt(postingan_id),
                    judul_tugas,
                    dokumen_tugas,
                    deskripsi_tugas,
                    tugas_tanggal,
                    pengumpulan_mulai,
                    pengumpulan_selesai,
                    is_active: is_active === "true",
                    is_delete: is_delete === "true",
                })
            }
        },
    });

    const { mutate: createTugas, isLoading: createTugasIsLoading } = useCreateTugas({
        onError: (error) => {
            if (error.response && error.response.data.errors) {
                const formattedErrors = error.response.data.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg
                    return acc
                }, {})
                setBackendErrors(formattedErrors)
            }
            console.error(error);
        },
        onSuccess: () => { 
            refetchPostingan()
            handleClose() 
        }
    })

    const handleFormInput = (event) => {
        const { name, type, files, value } = event.target;
        if (type === "file") {
            formik.setFieldValue(name, files[0]);
        } else {
            formik.setFieldValue(name, value);
        }
    };
    
    return (
        <div className={`modal fade modal-lg ${show ? "show" : ""} modal-backdrop-manual`} style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel">{title && title}</h6>
                        </div>
                        <div className="modal-body"> 
                            <div className="mb-3">
                                <label className="form-label">Judul Tugas</label>
                                <input
                                    type="text"
                                    className={`form-control input-no-focus border-utama ${formik.errors.judul ? "border-red" : ""}`}
                                    name="judul_tugas"
                                    onChange={handleFormInput} 
                                    value={formik.values.judul_tugas}
                                />
                                {formik.errors.judul_tugas && <span className="text-danger fs-kecil">{formik.errors.judul_tugas}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Dokumen Tugas</label>
                                <input
                                    type="file"
                                    className={`form-control input-no-focus border-utama ${formik.errors.dokumen_tugas ? "border-red" : ""}`}
                                    name="dokumen_tugas"
                                    onChange={handleFormInput}  
                                />
                                {formik.errors.dokumen_tugas && <span className="text-danger fs-kecil">{formik.errors.dokumen_tugas}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Deskripsi</label>
                                <textarea
                                    className={`form-control input-no-focus border-utama ${formik.errors.deskripsi_tugas ? "border-red" : ""}`}
                                    name="deskripsi_tugas"
                                    onChange={handleFormInput} 
                                    value={formik.values.deskripsi_tugas}
                                />
                                {formik.errors.deskripsi_tugas && <span className="text-danger fs-kecil">{formik.errors.deskripsi_tugas}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tugas Tanggal</label>
                                <input
                                    type="date"
                                    className={`form-control input-no-focus border-utama ${formik.errors.tugas_tanggal ? "border-red" : ""}`}
                                    name="tugas_tanggal"
                                    onChange={handleFormInput} 
                                    value={formik.values.tugas_tanggal}
                                />
                                {formik.errors.tugas_tanggal && <span className="text-danger fs-kecil">{formik.errors.tugas_tanggal}</span>}
                            </div>
                            <div className="mb-3">
                                <div className="row g-3">
                                    <div className="col">
                                        <label className="form-label">Pengumpulan Mulai</label>
                                        <input
                                            type="date"
                                            className={`form-control input-no-focus border-utama ${formik.errors.pengumpulan_mulai ? "border-red" : ""}`}
                                            name="pengumpulan_mulai"
                                            onChange={handleFormInput} 
                                            value={formik.values.pengumpulan_mulai}
                                        />
                                        {formik.errors.pengumpulan_mulai && <span className="text-danger fs-kecil">{formik.errors.pengumpulan_mulai}</span>}
                                    </div>
                                    <div className="col">
                                        <label className="form-label">pengumpulan Selesai</label>
                                        <input
                                            type="date"
                                            className={`form-control input-no-focus border-utama ${formik.errors.pengumpulan_selesai ? "border-red" : ""}`}
                                            name="pengumpulan_selesai"
                                            onChange={handleFormInput} 
                                            value={formik.values.pengumpulan_selesai}
                                        />
                                        {formik.errors.pengumpulan_selesai && <span className="text-danger fs-kecil">{formik.errors.pengumpulan_selesai}</span>}
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
                                                    )   : null}
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
                                                    )   : null}
                                                </div>
                                            </div>
                                        </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" onClick={() => handleClose(false)}>
                                Close
                            </button>
                            <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

ModalInputTugas.propTypes = {
    postingan_id: PropTypes.number,

    show: PropTypes.bool,

    title: PropTypes.string,

    handleClose: PropTypes.func,

    refetchPostingan: PropTypes.func,

}
export default ModalInputTugas;
