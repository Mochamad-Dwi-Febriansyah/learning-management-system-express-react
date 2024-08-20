import ManageLayout from "../../../components/layouts/ManageLayout";
import AssigmentImg from "../../../assets/img/Assignment.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchTugasDetail } from "../../../features/Guru/Tugas/useFetchTugasDetail";
import { useFetchPengumpulanTugas } from "../../../features/Guru/PengumpulanTugas/useFetchPengumpulanTugas.js";
import { downloadTugas } from "../../../features/Guru/Tugas/downloadTugas.js";
import { useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import { useEditPengumpulanTugas } from "../../../features/Guru/PengumpulanTugas/useEditPengumpulanTugas.js";
import { fetchFileFromServerPengumpulanTugas } from "../../../features/Guru/PengumpulanTugas/fetchFileFromServerPengumpulanTugas.js";

const PengumpulanTugasManage = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { tugas_id } = useParams();
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false)
        formik.resetForm()
    };

    // Fetch data tugas detail dan pengumpulan tugas
    const { data: tugasData, isLoading: postinganIsLoading } = useFetchTugasDetail();
    const { data: pengumpulanTugasData, isLoading: pengumpulanTugasIsLoading, refetch: refetchPengumpulanTugas } = useFetchPengumpulanTugas();
    // console.log(pengumpulanTugasData)

    const { mutate: editPengumpulanTugas, isLoading: editPengumpulanTugasIsLoading } = useEditPengumpulanTugas({
        onSuccess: () => {
            handleClose()
            refetchPengumpulanTugas()
        }
    })

    // Menggabungkan loading state
    const isLoading = postinganIsLoading || pengumpulanTugasIsLoading;

    // Handle download file
    const handleDownloadFile = (fileUrl) => {
        downloadTugas({ fileUrl });
    };

    const formik = useFormik({
        initialValues: {
            id: '',
            tugas_id: '',
            siswa_id: '',
            deskripsi_pengumpulan_tugas: '',
            dokumen_pengumpulan_tugas: '',
            pengumpulan_telat: '',
            nilai: '',
            catatan: '', 
            is_active: true,
            is_delete: false,
        },
        validationSchema: yup.object().shape({
            nilai: yup.number(), 
        }),
        onSubmit: () => {
             console.log(formik.values)
            const { id, siswa_id, deskripsi_pengumpulan_tugas, dokumen_pengumpulan_tugas, pengumpulan_telat, nilai, catatan, is_active, is_delete, } = formik.values


            const PengumpulanTugas = {
                id,
                tugas_id: parseInt(tugas_id),
                siswa_id: parseInt(siswa_id),
                deskripsi_pengumpulan_tugas,
                dokumen_pengumpulan_tugas,
                pengumpulan_telat: pengumpulan_telat,
                nilai,
                catatan, 
                is_active: is_active === "true",
                is_delete: is_delete === "true",
            }
            editPengumpulanTugas(PengumpulanTugas)
        },
    })


    const onEditClick = async (pengumpulanTugas) => {
        // console.log(pengumpulanTugas)
        formik.setFieldValue("id", pengumpulanTugas.id)
        formik.setFieldValue("tugas_id", pengumpulanTugas.tugas_id)
        formik.setFieldValue("siswa_id", pengumpulanTugas.siswa_id)
        formik.setFieldValue("deskripsi_pengumpulan_tugas", pengumpulanTugas.deskripsi_pengumpulan_tugas)
        formik.setFieldValue("pengumpulan_telat", pengumpulanTugas.pengumpulan_telat)
        formik.setFieldValue("nilai", pengumpulanTugas.nilai)
        formik.setFieldValue("catatan", pengumpulanTugas.catatan)
        formik.setFieldValue("is_active", pengumpulanTugas.is_active ? "true" : "false");
        formik.setFieldValue("is_delete", pengumpulanTugas.is_delete ? "true" : "false"); 
        const file = await fetchFileFromServerPengumpulanTugas(pengumpulanTugas.dokumen_pengumpulan_tugas);
        formik.setFieldValue('dokumen_pengumpulan_tugas', file);
        handleShow();
    }

    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value) 
    }
    

    const renderPengumpulanTugas = () => {
        return pengumpulanTugasData?.data.data.map((pengumpulanTugasdt) => {
            return (
                <tr key={pengumpulanTugasdt.id}>
                    <td><p className="text-xs text-dark mb-0">{pengumpulanTugasdt.nama_siswa} {pengumpulanTugasdt.nama_akhir_siswa}</p></td>
                    <td><p className="text-xs text-dark mb-0">{pengumpulanTugasdt.dokumen_pengumpulan_tugas}</p></td>
                    <td><p className="text-xs text-dark mb-0">{pengumpulanTugasdt.deskripsi_pengumpulan_tugas}</p></td>
                    <td><p className="text-center text-xs text-dark mb-0">{pengumpulanTugasdt.pengumpulan_telat === true ? <span className="badge badge-sm bg-gradient-danger">Y</span> : <span className="badge badge-sm bg-gradient-success">N</span>}</p></td>
                    <td><p className="text-xs text-dark mb-0">{pengumpulanTugasdt.catatan}</p></td>
                    <td><p className="text-xs text-dark mb-0">{pengumpulanTugasdt.nilai}</p></td>
                    <td className="align-middle text-center">
                        <button className="btn btn-sm px-2 py-1 mb-0" onClick={() => onEditClick(pengumpulanTugasdt)}><i className="fas fa-pencil-alt text-dark" aria-hidden="true"></i></button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <ManageLayout>
                {isLoading ? (
                    <div className="spinner-border text-primary" role="status"></div>
                ) : (
                    <div className="col-12">
                        <div className="d-flex">
                            <a className="btn btn-link text-indigo px-3 mb-0 fs-5" onClick={() => navigate(-1)}>
                                <i className="fa fa-arrow-left text-white" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className="card mb-4 rounded-xl py-3">
                            <div className="card-header py-2 d-flex align-items-center gap-2">
                                <h6 className="mb-0">{tugasData?.data.data.judul_tugas}</h6>
                                <p className="ms-auto text-xs text-secondary mb-0">{tugasData?.data.data.tugas_tanggal}</p>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="border-bottom px-4 py-3">
                                    <div className="d-flex gap-1 mb-1">
                                        <p className="mb-0 text-xs font-weight-bolder">Tugas dibuka:</p>
                                        <p className="mb-0 text-xs font-weight-normal">
                                            {tugasData?.data.data.pengumpulan_mulai}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <p className="mb-0 text-xs font-weight-bolder">Tugas ditutup:</p>
                                        <p className="mb-0 text-xs font-weight-normal">
                                            {tugasData?.data.data.pengumpulan_selesai}
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex px-4 py-3 border-bottom">
                                    <div
                                        className="d-flex flex-row justify-content-center gap-2 cursor-pointer"
                                        onClick={() => handleDownloadFile(tugasData.data.data.dokumen_tugas)}
                                    >
                                        <div className="">
                                            <img src={AssigmentImg} alt="" />
                                        </div>
                                        <div>
                                            <h6 className="mb-0 text-sm">{tugasData?.data.data.judul_tugas}</h6>
                                            <p className="text-xs text-secondary mb-0">{tugasData?.data.data.deskripsi_tugas}</p>
                                        </div>
                                    </div>
                                </div>
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
                                                    Dokumen
                                                </th>
                                                <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                                    Deskripsi
                                                </th>
                                                <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                                    Telat?
                                                </th>
                                                <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                                    Catatan
                                                </th>
                                                <th className="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">
                                                    Nilai
                                                </th>
                                                <th className="text-center text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderPengumpulanTugas()}
                                            <tr className="text-center">
                                                <td>
                                                    {isLoading ? <div className="spinner-border text-primary" role="status">
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
                                                        <h6 className="modal-title" id="exampleModalLabel">Edit Jawaban</h6>
                                                    </div>
                                                    <div className="modal-body"> 
                                                        <div className="mb-3">
                                                            <label className="form-label">Nilai</label>
                                                            <input 
                                                                className={`form-control input-no-focus border-utama  ${formik.errors.nilai ? 'border-red' : ''}`}
                                                                name="nilai"
                                                                onChange={handleFormInput}
                                                                value={formik.values.nilai || ''}
                                                            />
                                                            {formik.errors.nilai && <span className="text-danger fs-kecil">{formik.errors.nilai}</span>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Catatan</label>
                                                            <textarea
                                                                className={`form-control input-no-focus border-utama  ${formik.errors.catatan ? 'border-red' : ''}`}
                                                                name="catatan"
                                                                onChange={handleFormInput}
                                                                value={formik.values.catatan || ''}
                                                            />
                                                            {formik.errors.catatan && <span className="text-danger fs-kecil">{formik.errors.catatan}</span>}
                                                        </div>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                                        {/* <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">Kirim
                                            </button> */}
                                                        <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                                            {editPengumpulanTugasIsLoading ? <div className="spinner-border text-primary" role="status">

                                                            </div> : 'Save changes'}</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ManageLayout>
        </>
    );
};

export default PengumpulanTugasManage;
