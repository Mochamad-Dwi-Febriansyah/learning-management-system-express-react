const  prisma = require("../db/index.js") 

const findKehadiran = async () => {
    const kehadiran = await prisma.kehadiran.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })

    return kehadiran
}

const findKehadiranById = async (id) => {
    const kehadiran = await prisma.kehadiran.findUnique({
        where:{
            id:id, 
        }
    }) 
    return kehadiran
}


const insertKehadiran = async (newKehadiranData) => { 
        await prisma.kehadiran.deleteMany({
        where: {
            kelas_id : newKehadiranData.kelas_id,
            mata_pelajaran_id : newKehadiranData.mata_pelajaran_id,
            siswa_id: newKehadiranData.siswa_id ,  
        }
    })
    const kehadiran = await prisma.kehadiran.create({
        data:{       
   
            kelas_id: newKehadiranData.kelas_id , 
            mata_pelajaran_id: newKehadiranData.mata_pelajaran_id ,  
            siswa_id: newKehadiranData.siswa_id ,  
            jadwal_id: newKehadiranData.jadwal_id ,          
            tanggal_kehadiran: newKehadiranData.tanggal_kehadiran , 
            kehadiran_tipe: newKehadiranData.kehadiran_tipe , 
            dibuat_oleh: newKehadiranData.dibuat_oleh ,
            is_active      :newKehadiranData.is_active,
            is_delete     :newKehadiranData.is_delete ,
        }
    })
    return kehadiran
}

const deleteKehadiran = async (id) => {
    await prisma.kehadiran.delete({
        where: {
            id: id
        }
    }) 
}

const editKehadiran = async (id, kehadiranData) => { 
    const kehadiran =  await  prisma.kehadiran.update({
        where:{
            id: id
        },
        data:{  
            kelas_id: kehadiranData.kelas_id , 
            mata_pelajaran_id: kehadiranData.mata_pelajaran_id ,  
            siswa_id: kehadiranData.siswa_id ,  
            jadwal_id: kehadiranData.jadwal_id ,          
            tanggal_kehadiran: kehadiranData.tanggal_kehadiran , 
            kehadiran_tipe: kehadiranData.kehadiran_tipe , 
            dibuat_oleh: kehadiranData.dibuat_oleh ,
            is_active      :kehadiranData.is_active,
            is_delete     :kehadiranData.is_delete ,
        }
    })

    return kehadiran
}

const findKehadiranByKelPelId = async (kelasid, pelajaranid) => {
    const kehadiran = await prisma.kehadiran.findMany({
        where:{
            kelas_id:kelasid, 
            mata_pelajaran_id:pelajaranid,  
        }
    }) 
    return kehadiran
}
 

module.exports = {
    findKehadiran,
    findKehadiranById,
    insertKehadiran,
    deleteKehadiran,
    editKehadiran,
    findKehadiranByKelPelId
}