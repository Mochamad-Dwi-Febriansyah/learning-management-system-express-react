import CardContainer from "../../organisms/CardContainer/Index"
import Card from "../../atoms/Card/Index"

const SiswaDashboard = () => {
    return (
        <>
        <CardContainer title="Informasi" textColor='text-white'>
               <Card title="Total Ordes" value="120" bgIcon="bg-gradient-dark" icon="ni ni-money-coins"/>
              <Card title="Total Users" value="300" bgIcon="bg-gradient-success" icon="ni ni-world"/>
        </CardContainer>     

        <CardContainer title="Daftar Mata Pelajaran" textColor='text-dark'> 
              <Card title="Dasar Program Keahlian" value="120" bgIcon="bg-gradient-danger" icon="ni ni-money-coins" linkTo="/pelajaran"/>
              <Card title="Rekayasa Perangkat Lunak" value="300" bgIcon="bg-gradient-success" icon="ni ni-world" linkTo="/pelajaran"/>
              <Card title="Cyber Core" value="300" bgIcon="bg-gradient-primary" icon="ni ni-world" linkTo="/pelajaran"/> 
        </CardContainer>  
        </>
    )
}

export default SiswaDashboard