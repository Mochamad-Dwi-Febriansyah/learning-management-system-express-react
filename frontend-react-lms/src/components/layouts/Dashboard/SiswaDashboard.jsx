import CardContainer from "../../organisms/CardContainer/Index"
import Card from "../../atoms/Card/Index"
import { useFetchSiswaClassMe } from "../../../features/Siswa/SiswaKelas/useFetchSiswaClassMe";

const SiswaDashboard = () => {

    const { data } = useFetchSiswaClassMe()

    const bgIcons = [
        "bg-gradient-danger",
        "bg-gradient-success",
        "bg-gradient-primary",
        "bg-gradient-info",
        "bg-gradient-warning",
    ];

    const icon = [
        "ni ni-money-coins",
        "ni ni-world"
    ];

    const getRandomBgIcon = () => {
        const randomIndex = Math.floor(Math.random() * bgIcons.length);
        return bgIcons[randomIndex];
    };
    const getRandomIcon = () => {
        const randomIndex = Math.floor(Math.random() * icon.length);
        return icon[randomIndex];
    };

    const renderContent = () => {
        return data?.data.data.map((siswaKelas) => {    
            return (
                <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4" key={siswaKelas.id}>
                <Card key={siswaKelas.id} title={siswaKelas.nama_kelas} kelas_id={siswaKelas.kelas_id} mata_pelajaran_id={siswaKelas.mata_pelajaran_id} guru_id={siswaKelas.guru_id} subtitle={siswaKelas.nama_mata_pelajaran} bgIcon={getRandomBgIcon()} icon={getRandomIcon()} linkTo={`/s-kelas/${siswaKelas.kelas_id}/s-mata-pelajaran/${siswaKelas.mata_pelajaran_id}/s-guru/${siswaKelas.guru_id}`}/>
                </div>
            )
         
        })
    }

    return (
        <>
        <CardContainer title="Daftar Mata Pelajaran"  textColor='text-white'> 
            {renderContent()} 
        </CardContainer>  
        </>
    )
}

export default SiswaDashboard