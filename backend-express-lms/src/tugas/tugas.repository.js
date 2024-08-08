const  prisma = require("../db/index.js") 

const findTugas = async () => {
    const tugas = await prisma.tugas.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })

    return tugas
}

const findTugasById = async (id) => {
    const tugas = await prisma.tugas.findUnique({
        where:{
            id:id, 
        }
    }) 
    return tugas
}


const insertTugas = async (newTugasData) => { 
    const tugas = await prisma.tugas.create({
        data:{    
            judul_tugas: newTugasData.judul_tugas , 
            dokumen_tugas: newTugasData.dokumen_tugas , 
            deskripsi_tugas: newTugasData.deskripsi_tugas , 
            kelas_id: newTugasData.kelas_id , 
            mata_pelajaran_id: newTugasData.mata_pelajaran_id ,  
            postingan_id: newTugasData.postingan_id ,  
            tugas_tanggal: newTugasData.tugas_tanggal ,  
            pengumpulan_mulai: newTugasData.pengumpulan_mulai ,  
            pengumpulan_selesai: newTugasData.pengumpulan_selesai ,  
            is_active      :newTugasData.is_active,
            is_delete     :newTugasData.is_delete ,
        }
    })
    return tugas
}

const deleteTugas = async (id) => {
    await prisma.tugas.delete({
        where: {
            id: id
        }
    }) 
}

const editTugas = async (id, tugasData) => { 
    const tugas =  await  prisma.tugas.update({
        where:{
            id: id
        },
        data:{    
            judul_tugas: tugasData.judul_tugas , 
            dokumen_tugas: tugasData.dokumen_tugas , 
            deskripsi_tugas: tugasData.deskripsi_tugas , 
            kelas_id: tugasData.kelas_id , 
            mata_pelajaran_id: tugasData.mata_pelajaran_id ,  
            postingan_id: tugasData.postingan_id ,  
            tugas_tanggal: tugasData.tugas_tanggal ,  
            pengumpulan_mulai: tugasData.pengumpulan_mulai ,  
            pengumpulan_selesai: tugasData.pengumpulan_selesai ,  
            is_active      :tugasData.is_active,
            is_delete     :tugasData.is_delete ,
        }
    })

    return tugas
}

const findTugasByKelPelPosId = async (kelasid, pelajaranid, postinganid) => {
    const tugas = await prisma.tugas.findFirst({
        where:{
            kelas_id:kelasid, 
            mata_pelajaran_id:pelajaranid, 
            postingan_id:postinganid, 
        }
    }) 
    return tugas
}
 

module.exports = {
    findTugas,
    findTugasById,
    insertTugas,
    deleteTugas,
    editTugas,
    findTugasByKelPelPosId
}