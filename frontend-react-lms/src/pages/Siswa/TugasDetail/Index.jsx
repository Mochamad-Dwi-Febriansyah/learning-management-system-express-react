import ManageLayout from "../../../components/layouts/ManageLayout"
import AssigmentImg from "../../../assets/img/Assignment.jpg";
import { useNavigate } from "react-router-dom";
import { useFetchTugasDetail } from "../../../features/Siswa/Tugas/useFetchTugasDetail.js";
import { downloadTugas } from "../../../features/Siswa/Tugas/downloadTugas.js";
import { useFetchPengumpulanTugasById } from "../../../features/Siswa/PengumpulanTugas/useFetchPengumpulanTugasById.js";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useCreatePengumpulanTugas } from "../../../features/Siswa/PengumpulanTugas/useCreatePengumpulanTugas.js";
import { useEditPengumpulanTugas } from "../../../features/Siswa/PengumpulanTugas/useEditPengumpulanTugas.js";
// import * as yup from "yup"
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { downloadPengumpulanTugas } from "../../../features/Siswa/PengumpulanTugas/downloadPengumpulanTugas.js";
import { fetchFileFromServerPengumpulanTugas } from "../../../features/Siswa/PengumpulanTugas/fetchFileFromServerPengumpulanTugas.js";

const TugasDetail = () => {

    const { tugas_id } = useParams();
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setShow(true);
    }

    const { data, isLoading: postinganIsLoading } = useFetchTugasDetail()

    const { data: pengumpulanTugas, isLoading: pengumpulanTugasIsLoading, refetch: refetchPengumpulanTugas } = useFetchPengumpulanTugasById()
    const formattedCreatedAt = moment(pengumpulanTugas?.data?.data.createdAt);
    const createdAtLocalPlus7Hours = formattedCreatedAt.add(-7, 'hours').format('YYYY-MM-DD HH:mm:ss');

    const { mutate: createPengumpulanTugas, isLoading: createPengumpulanTugasIsLoading } = useCreatePengumpulanTugas({
        onSuccess: () => {
            handleClose()
            refetchPengumpulanTugas()
        }
    })
    const { mutate: editPengumpulanTugas, isLoading: editPengumpulanTugasIsLoading } = useEditPengumpulanTugas({
        onSuccess: () => {
            handleClose()
            refetchPengumpulanTugas()
        }
    })
    // console.log(pengumpulanTugas)

    const [timeRemaining, setTimeRemaining] = useState("");
    const [statusTimeRemaining, setStatusTimeRemaining] = useState(false);
    //    console.log(new Date())
    useEffect(() => {
        if (data?.data.data.pengumpulan_selesai) {
            const interval = setInterval(() => {
                const now = new Date();

                const deadline = new Date(moment(data?.data.data.pengumpulan_selesai).format('YYYY-MM-DD 23:59:00'))
                const difference = deadline - now;
                // console.log()

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(difference / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setTimeRemaining(`${days} Hari ${hours} Jam  ${minutes} Menit ${seconds} Detik`);
                } else {
                    const lateness = Math.abs(difference);
                    const lateDays = Math.floor(lateness / (1000 * 60 * 60 * 24));
                    const lateHours = Math.floor(lateness / (1000 * 60 * 60));
                    const lateMinutes = Math.floor((lateness % (1000 * 60 * 60)) / (1000 * 60));
                    const lateSeconds = Math.floor((lateness % (1000 * 60)) / 1000);

                    setTimeRemaining(`${lateDays} Hari ${lateHours} Jam ${lateMinutes} Menit ${lateSeconds} Detik`);
                    // clearInterval(interval); 
                    setStatusTimeRemaining(true);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [data?.data.data.pengumpulan_selesai]);

    const handleDownloadTugas = (fileUrl) => {
        downloadTugas({ fileUrl });
    };

    const handleDownloadPengumpulanTugas = (fileUrl) => {
        downloadPengumpulanTugas({ fileUrl });
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
        onSubmit: () => {
        //  console.log(formik.values)
            const { id, siswa_id, deskripsi_pengumpulan_tugas, dokumen_pengumpulan_tugas, nilai, catatan, is_active, is_delete, } = formik.values
 

            const PengumpulanTugas = {
                id,
                tugas_id: parseInt(tugas_id),
                siswa_id: parseInt(siswa_id),
                deskripsi_pengumpulan_tugas,
                dokumen_pengumpulan_tugas,
                pengumpulan_telat: statusTimeRemaining,
                nilai,
                catatan,
                is_active: is_active === "true",
                is_delete : is_delete === "true",
            }
            if (id) {
                editPengumpulanTugas(PengumpulanTugas)
            } else {
                createPengumpulanTugas(PengumpulanTugas)
            }
        },
    }) 

    const onEditClick =  async (pengumpulanTugas) => {
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
        // console.log(file)
        formik.setFieldValue('dokumen_pengumpulan_tugas', file);
        handleShow();
    }


    const handleFormInput = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value) 
    }

    return (
        <>
            <ManageLayout>
                {postinganIsLoading ? (<div className="spinner-border text-white" role="status"></div>) : (<div className="col-12">
                    <div className="d-flex">
                        <a className="btn btn-link text-indigo px-3 mb-0 fs-5" onClick={() => navigate(-1)}><i className="fa fa-arrow-left text-white" aria-hidden="true"></i></a>
                    </div>
                    <div className="card mb-4 rounded-xl py-3">
                        <div className="card-header py-2 d-flex align-items-center gap-2">
                            <h6 className="mb-0">{data?.data.data.judul_tugas}</h6>
                            <p className="ms-auto text-xs text-secondary mb-0">{data?.data.data.tugas_tanggal}</p>
                            <button className="btn btn-link m-0 p-0 fs-3"></button>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="border-bottom px-4 py-3">
                                <div className="d-flex gap-1 mb-1">
                                    <p className="mb-0 text-xs font-weight-bolder">
                                        Tugas dibuka :
                                    </p>
                                    <p className="mb-0 text-xs font-weight-normal">
                                        {/* Sunday, 10 March 2024, 12:00 AM */}
                                        {data?.data.data.pengumpulan_mulai}
                                    </p>
                                </div>
                                <div className="d-flex gap-1">
                                    <p className="mb-0 text-xs font-weight-bolder">
                                        Tugas ditutup :
                                    </p>
                                    <p className="mb-0 text-xs font-weight-normal">
                                        {/* Saturday, 1 Desember 2024, 12:00 AM */}
                                        {data?.data.data.pengumpulan_selesai}
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex px-4 py-3  border-bottom">
                                <div className="d-flex flex-row justify-content-center gap-2 cursor-pointer" onClick={() => handleDownloadTugas(data.data.data.dokumen_tugas)}>
                                    <div className="">
                                        <img src={AssigmentImg} alt="" />
                                    </div>
                                    <div>
                                        <h6 className="mb-0 text-sm">{data?.data.data.judul_tugas}</h6>
                                        <p className="text-xs text-secondary mb-0">
                                            {data?.data.data.deskripsi_tugas}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {pengumpulanTugasIsLoading ? (
                                <div className="spinner-border text-primary" role="status"></div>
                            ) : (
                                <div className="d-flex px-4 py-3 w-100 flex-column">
                                    <h6 className="mb-3 text-sm">Status Pengumpulan</h6>
                                    <div className="table-responsive mb-3">
                                        <table className="table align-items-center mb-0 w-100 table-striped">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <h6 className="mb-0 text-sm">Submission status</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas ? (
                                                        <td className="text-white">
                                                            <p className="text-xs text-dark font-weight-bold mb-0">Not Submitted</p>
                                                        </td>
                                                    ) : (
                                                        <>
                                                        {statusTimeRemaining === true ?
                                                            <td className="bg-danger text-white">
                                                                <p className="text-xs font-weight-bold mb-0">Submitted Late</p>
                                                            </td>
                                                            :
                                                            <td className="bg-success text-white">
                                                                <p className="text-xs  font-weight-bold mb-0">Submitted for grading</p>
                                                            </td>
                                                        }
                                                    </> 
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h6 className="mb-0 text-sm">Grading status</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas || pengumpulanTugas?.data?.data.nilai === null ? (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">Not graded</p>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{pengumpulanTugas?.data?.data.nilai}</p>
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h6 className="mb-0 text-sm">Time Remaining</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas ? (
                                                        <>
                                                        {statusTimeRemaining === true ? 
                                                        <td className="bg-danger text-white">
                                                            <p className="text-xs font-weight-bold mb-0">{timeRemaining}</p>
                                                        </td>
                                                        :
                                                        <td className="bg-success text-white">
                                                            <p className="text-xs font-weight-bold mb-0">{timeRemaining}</p>
                                                        </td>
                                                        }
                                                        </>
                                                    ) : (
                                                        <>
                                                            {statusTimeRemaining === true ?
                                                                <td className="bg-danger text-white">
                                                                    <p className="text-xs font-weight-bold mb-0">{createdAtLocalPlus7Hours}</p>
                                                                </td>
                                                                :
                                                                <td className="bg-success text-white">
                                                                    <p className="text-xs  font-weight-bold mb-0">{createdAtLocalPlus7Hours}</p>
                                                                </td>
                                                            }
                                                        </>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h6 className="mb-0 text-sm">Last Modified</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas ? (
                                                        <td className="text-dark">
                                                            <p className="text-xs font-weight-bold mb-0">-</p>
                                                        </td>
                                                    ) : ( 
                                                         <>
                                                         {statusTimeRemaining === true ?
                                                             <td className="bg-danger text-white">
                                                                 <p className="text-xs font-weight-bold mb-0">{createdAtLocalPlus7Hours}</p>
                                                             </td>
                                                             :
                                                             <td className="bg-success text-white">
                                                                 <p className="text-xs  font-weight-bold mb-0">{createdAtLocalPlus7Hours}</p>
                                                             </td>
                                                         }
                                                     </> 
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <h6 className="mb-0 text-sm">File Submission</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas ? (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">-</p>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0 cursor-pointer" onClick={() => handleDownloadPengumpulanTugas(pengumpulanTugas?.data?.data.dokumen_pengumpulan_tugas)}>{pengumpulanTugas?.data?.data.dokumen_pengumpulan_tugas}</p>
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th className="border-0">
                                                        <h6 className="mb-0 text-sm">Deskripsi</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas ? (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">-</p>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0 text-collapse-300">{pengumpulanTugas?.data?.data.deskripsi_pengumpulan_tugas}</p>
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th className="border-0">
                                                        <h6 className="mb-0 text-sm">Submission comments</h6>
                                                    </th>
                                                    {pengumpulanTugas?.data?.data.status || !pengumpulanTugas ? (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">-</p>
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{pengumpulanTugas?.data?.data.catatan}</p>
                                                        </td>
                                                    )}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-inline-block text-center">
                                        {!pengumpulanTugas ?
                                            (<button className="btn btn-primary" onClick={() => handleShow()}>Upload Jawaban</button>)
                                            :
                                            (<button className="btn btn-primary" onClick={() => onEditClick(pengumpulanTugas.data.data)}>Edit</button>)
                                        }
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>


                    <div className={`modal fade modal-lg ${show ? 'show' : ''} modal-backdrop-manual`} style={{ display: show ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="modal-header">
                                        <h6 className="modal-title" id="exampleModalLabel">Kirim Jawaban</h6>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <label className="form-label">Dokumen</label>
                                                <span className="text-xs fw-medium ms-auto text-primary" onClick={() => handleDownloadPengumpulanTugas(pengumpulanTugas?.data?.data.dokumen_pengumpulan_tugas)}>{formik.values.dokumen_pengumpulan_tugas.name}</span>
                                            </div> 
                                            <input
                                                type="file"
                                                className={`form-control input-no-focus border-utama ${formik.errors.dokumen_pengumpulan_tugas ? 'border-red' : ''}`}
                                                name="dokumen_pengumpulan_tugas"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    formik.setFieldValue('dokumen_pengumpulan_tugas', file);
                                                }} 
                                            />  
                                            {formik.errors.dokumen_pengumpulan_tugas && <span className="text-danger fs-kecil">{formik.errors.dokumen_pengumpulan_tugas}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Deskripsi</label>
                                            <textarea
                                                className={`form-control input-no-focus border-utama  ${formik.errors.deskripsi_pengumpulan_tugas ? 'border-red' : ''}`}
                                                name="deskripsi_pengumpulan_tugas"
                                                onChange={handleFormInput}
                                                value={formik.values.deskripsi_pengumpulan_tugas}
                                            />
                                            {formik.errors.deskripsi_pengumpulan_tugas && <span className="text-danger fs-kecil">{formik.errors.deskripsi_pengumpulan_tugas}</span>}
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn badge badge-sm bg-gradient-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                        {/* <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">Kirim
                                            </button> */}
                                        <button type="submit" className="btn badge badge-sm bg-gradient-primary m-1" data-bs-dismiss="modal">
                                            {createPengumpulanTugasIsLoading ? <div className="spinner-border text-primary" role="status">

                                            </div> : 'Save changes'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



                </div>




                )}


            </ManageLayout>
        </>
    )
}

export default TugasDetail