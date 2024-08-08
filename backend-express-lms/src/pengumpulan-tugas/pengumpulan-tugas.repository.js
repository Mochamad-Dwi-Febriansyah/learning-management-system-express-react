const  prisma = require("../db/index.js") 

const findPengumpulanTugas = async () => {
    const pengumpulanTugas = await prisma.pengumpulan_Tugas.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })
    return pengumpulanTugas
}

const findPengumpulanTugasById = async (id) => {
    const pengumpulanTugas = await prisma.pengumpulan_Tugas.findUnique({
        where:{
            id:id, 
        }
    }) 
    return pengumpulanTugas
}

const insertPengumpulanTugas = async (newPengumpulanTugasData) => { 
    const pengumpulanTugas = await prisma.pengumpulan_Tugas.create({
        data:{     
            tugas_id          : newPengumpulanTugasData.tugas_id, 
            siswa_id : newPengumpulanTugasData.siswa_id,  
            deskripsi_pengumpulan_tugas      : newPengumpulanTugasData.deskripsi_pengumpulan_tugas,  
            dokumen_pengumpulan_tugas      : newPengumpulanTugasData.dokumen_pengumpulan_tugas,  
            pengumpulan_telat      : newPengumpulanTugasData.pengumpulan_telat,  
            nilai      : newPengumpulanTugasData.nilai,  
            catatan      : newPengumpulanTugasData.catatan,  
            is_active         : newPengumpulanTugasData.is_active,
            is_delete         : newPengumpulanTugasData.is_delete,
        }
    })
    return pengumpulanTugas
}

const deletePengumpulanTugas = async (id) => {
    await prisma.pengumpulan_Tugas.delete({
        where: {
            id: id
        }
    }) 
}

const editPengumpulanTugas = async (id, pengumpulanTugasData) => { 
    const pengumpulanTugas =  await  prisma.pengumpulan_Tugas.update({
        where:{
            id: id
        },
        data:{    
            tugas_id          : pengumpulanTugasData.tugas_id, 
            siswa_id : pengumpulanTugasData.siswa_id,  
            deskripsi_pengumpulan_tugas      : pengumpulanTugasData.deskripsi_pengumpulan_tugas,  
            dokumen_pengumpulan_tugas      : pengumpulanTugasData.dokumen_pengumpulan_tugas,  
            pengumpulan_telat      : pengumpulanTugasData.pengumpulan_telat,  
            nilai      : pengumpulanTugasData.nilai,  
            catatan      : pengumpulanTugasData.catatan,  
            is_active         : pengumpulanTugasData.is_active,
            is_delete         : pengumpulanTugasData.is_delete,
        }
    })

    return pengumpulanTugas
}

const findPengumpulanTugasByTugId = async (tugasId) => {
    const pengumpulanTugas = await prisma.pengumpulan_Tugas.findMany({
        where:{
            tugas_id:tugasId, 
        }
    }) 
    return pengumpulanTugas
}
const findPengumpulanTugasByTugSisId = async (tugasId, siswaId) => {
    const pengumpulanTugas = await prisma.pengumpulan_Tugas.findFirst({
        where:{
            tugas_id:tugasId, 
            siswa_id:siswaId,  
        }
    }) 
    return pengumpulanTugas
}
 

module.exports = {
    findPengumpulanTugas,
    findPengumpulanTugasById,
    insertPengumpulanTugas,
    deletePengumpulanTugas,
    editPengumpulanTugas,
    findPengumpulanTugasByTugSisId,
    findPengumpulanTugasByTugId
}