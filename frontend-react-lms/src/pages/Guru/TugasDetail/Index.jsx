import ManageLayout from "../../../components/layouts/ManageLayout"
import AssigmentImg from "../../../assets/img/Assignment.jpg";
import { useNavigate } from "react-router-dom";
import { useFetchTugasDetail } from "../../../features/Guru/Tugas/useFetchTugasDetail";
import { downloadTugas } from "../../../features/Guru/Tugas/downloadTugas.js";

const TugasDetail = () => {
    const navigate = useNavigate()

    const { data, isLoading: postinganIsLoading } = useFetchTugasDetail() 

    const handleDownloadFile = (fileUrl) => { 
        downloadTugas({ fileUrl });
    }; 

    return (
        <>
            <ManageLayout>
                {postinganIsLoading ? (<div className="spinner-border text-primary" role="status"></div>) :  (<div className="col-12">
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
                                <div className="d-flex flex-row justify-content-center gap-2 cursor-pointer" onClick={() => handleDownloadFile(data.data.data.dokumen_tugas)}>
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
                        </div>
                    </div>
                </div> )}
             

            </ManageLayout>
        </>
    )
}

export default TugasDetail