const  prisma = require("../db/index.js") 

const findMateri = async () => {
    const materi = await prisma.materi.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })

    return materi
}

const findMateriById = async (id) => {
    const materi = await prisma.materi.findUnique({
        where:{
            id:id, 
        }
    }) 
    return materi
}


const insertMateri = async (newMateriData) => { 
    const materi = await prisma.materi.create({
        data:{   
            judul_materi: newMateriData.judul_materi , 
            dokumen_materi: newMateriData.dokumen_materi , 
            deskripsi_materi: newMateriData.deskripsi_materi , 
            kelas_id: newMateriData.kelas_id , 
            mata_pelajaran_id: newMateriData.mata_pelajaran_id ,  
            postingan_id: newMateriData.postingan_id ,  
            is_active      :newMateriData.is_active,
            is_delete     :newMateriData.is_delete ,
        }
    })
    return materi
}

const deleteMateri = async (id) => {
    await prisma.materi.delete({
        where: {
            id: id
        }
    }) 
}

const editMateri = async (id, materiData) => { 
    const materi =  await  prisma.materi.update({
        where:{
            id: id
        },
        data:{  
            judul_materi: materiData.judul_materi, 
            dokumen_materi: materiData.dokumen_materi, 
            deskripsi_materi: materiData.deskripsi_materi, 
            kelas_id: materiData.kelas_id , 
            mata_pelajaran_id: materiData.mata_pelajaran_id,  
            postingan_id: materiData.postingan_id,  
            is_active      :materiData.is_active,
            is_delete     :materiData.is_delete ,
        }
    })

    return materi
}

const findMateriByKelPelPosId = async (kelasid, pelajaranid, postinganid) => {
    const materi = await prisma.materi.findFirst({
        where:{
            kelas_id:kelasid, 
            mata_pelajaran_id:pelajaranid, 
            postingan_id:postinganid, 
        }
    }) 
    return materi
}
 

module.exports = {
    findMateri,
    findMateriById,
    insertMateri,
    deleteMateri,
    editMateri,
    findMateriByKelPelPosId
}