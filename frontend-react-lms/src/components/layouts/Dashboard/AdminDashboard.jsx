import CardContainer from "../../organisms/CardContainer/Index"
import Card from "../../atoms/Card/Index"
import { useFetchSiswa } from "../../../features/Admin/Siswa/useFetchSiswa";
import { useFetchGuru } from "../../../features/Admin/Guru/useFetchGuru";
import { useFetchKelas } from "../../../features/Admin/Kelas/useFetchKelas";
import { useFetchMataPelajaran } from "../../../features/Admin/MataPelajaran/useFetchMataPelajaran";


const AdminDashboard = () => {
    const { data: dataSiswa } = useFetchSiswa();
    const { data: dataGuru } = useFetchGuru();
    const { data: dataKelas } = useFetchKelas();
    const { data: dataMataPelajaran } = useFetchMataPelajaran();

    const jumlahSiswa = dataSiswa?.data.data.length
    const jumlahGuru = dataGuru?.data.data.length
    const jumlahKelas = dataKelas?.data.data.length
    const jumlahMataPelajaran = dataMataPelajaran?.data.data.length
    return (
        <>
            <CardContainer title="Informasi" textColor='text-white'>
                <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4" >
                    <Card title="Total Siswa" value={jumlahSiswa} bgIcon="bg-gradient-dark" icon="ni ni-money-coins" linkTo="/kelola-siswa" />
                </div>
                <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4" >
                    <Card title="Total Guru" value={jumlahGuru} bgIcon="bg-gradient-success" icon="ni ni-world" linkTo="/kelola-guru" />
                </div>
                <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4" >
                    <Card title="Total Kelas" value={jumlahKelas} bgIcon="bg-gradient-primary" icon="ni ni-world" linkTo="/kelola-kelas" />
                </div>
                <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4" >
                    <Card title="Total Mata Pelajaran" value={jumlahMataPelajaran} bgIcon="bg-gradient-success" icon="ni ni-world" linkTo="/kelola-mata-pelajaran" />
                </div>
            </CardContainer>
        </>
    )
}

export default AdminDashboard