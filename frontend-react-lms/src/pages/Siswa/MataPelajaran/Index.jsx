import ManageLayout from "../../../components/layouts/ManageLayout"
import PdfImg from "../../../assets/img/pdf-24.png";
import AssigmentImg from "../../../assets/img/Assignment.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useFetchPostingan } from "../../../features/Siswa/Postingan/useFetchPostingan.js";

import { downloadMateri } from "../../../features/Siswa/Materi/downloadMateri.js";



const SMataPelajaran = () => {

    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }




    const { data: dataPostingan, isLoading: postinganIsLoading } = useFetchPostingan()

    const handleDownloadFile = (fileUrl) => {
        downloadMateri({ fileUrl });
    };


    const renderPostingan = () => {
        return dataPostingan?.data.data.map((postingan) => {
            return (
                <div className="card mb-4 rounded-xl py-3" key={postingan.id}>
                    <div className="card-header py-2 d-flex align-items-center gap-2">
                        <h6 className="mb-0">{postingan.nama}</h6>
                        <p className="ms-auto text-xs text-secondary mb-0 me-2">{formatDate(postingan.createdAt)}</p>
                    </div>


                    {(postingan.postinganTugas.length > 0 || postingan.postinganMateri.length > 0) && (
                        <div className="card-body-container">
                            <div className="card-body px-0 pt-0 pb-2">
                                {/* <details open className="px-4 py-3">
                                    <summary>Details</summary> */}
                                    <p className="text-uppercase text-secondary px-4 py-3 mb-0 text-xxs font-weight-bolder opacity-7  border-bottom">
                                        Author
                                    </p>
                                    {postingan.postinganTugas.length > 0 && (
                                        <>
                                            {postingan.postinganTugas.map((tugas) => (
                                                <div className="d-flex px-4 py-3 border-bottom align-items-center" key={tugas.id}>
                                                    <NavLink to={`/s-tugas/${tugas.id}`}>
                                                        <div className="d-flex flex-row justify-content-center gap-2">
                                                            <div>
                                                                <img src={AssigmentImg} alt="" />
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0 text-sm">{tugas.judul_tugas}</h6>
                                                                <p className="text-xs text-secondary mb-0">
                                                                    {tugas.deskripsi_tugas}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {postingan.postinganMateri.length > 0 && (
                                        <>
                                            {postingan.postinganMateri.map((materi) => (
                                                <div className="d-flex  px-4 py-3 border-bottom" key={materi.id}>
                                                    <div className="d-flex flex-row justify-content-center gap-2 cursor-pointer" onClick={() => handleDownloadFile(materi.dokumen_materi)}>
                                                        <div className="">
                                                            <img src={PdfImg} alt="" />
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0 text-sm  hover-text-indigo">{materi.judul_materi}</h6>
                                                            <p className="text-xs text-secondary mb-0">
                                                                {materi.deskripsi_materi}
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </>
                                    )}
                                {/* </details> */}
                            </div>
                        </div>
                    )}
                </div>
            )
        })
    }

    return (
        <>
            <ManageLayout>
                <div className="col-12">
                    <div className="d-flex">
                        <a className="btn btn-link text-indigo px-3 mb-0 fs-5" onClick={() => navigate(-1)}><i className="fa fa-arrow-left text-white" aria-hidden="true"></i></a>
                    </div>
                    {renderPostingan()}
                    {postinganIsLoading ? <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : null}
                </div>
            </ManageLayout>
        </>
    )
}

export default SMataPelajaran