import CardContainer from "../../organisms/CardContainer/Index"
import Card from "../../atoms/Card/Index" 
import { useFetchClassMe } from "../../../features/Admin/KelasMataPelajaran/useFetchClassMe";

const GuruDashboard = () => {
    const { data } = useFetchClassMe()

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
        return data?.data.data.map((kelas) => {    
            return (
                <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4" key={kelas.id}>
                <Card key={kelas.id} title={kelas.nama_kelas} kelas_id={kelas.kelas_id} mata_pelajaran_id={kelas.mata_pelajaran_id} subtitle={kelas.nama_mata_pelajaran} bgIcon={getRandomBgIcon()} icon={getRandomIcon()} linkTo={`/g-mata-pelajaran/${kelas.mata_pelajaran_id}`}/>
                </div>
            )
         
        })
    }

    
    return (
        <>  
        <CardContainer title="Daftar Mata Pelajaran"  textColor='text-white'> 
        {renderContent()}
              {/* <Card title="Rekayasa Perangkat Lunak" value="300" bgIcon="bg-gradient-success" icon="ni ni-world" linkTo="/pelajaran"/>
              <Card title="Cyber Core" value="300" bgIcon="bg-gradient-primary" icon="ni ni-world" linkTo="/pelajaran"/>  */}
        </CardContainer>  
        </>
    )
}

export default GuruDashboard