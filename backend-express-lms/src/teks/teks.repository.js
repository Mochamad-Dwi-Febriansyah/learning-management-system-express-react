const  prisma = require("../db/index.js") 

const findTeks = async () => {
    const teks = await prisma.teks.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })
    return teks
}

const findTeksById = async (id) => {
    const teks = await prisma.teks.findUnique({
        where:{
            id:id, 
        }
    }) 
    return teks
}

const insertTeks = async (newTeksData) => { 
    const teks = await prisma.teks.create({
        data:{
            judul_teks        : newTeksData.judul_teks, 
            dokumen_teks      : newTeksData.dokumen_teks, 
            deskripsi_teks    : newTeksData.deskripsi_teks, 
            kelas_id          : newTeksData.kelas_id, 
            mata_pelajaran_id : newTeksData.mata_pelajaran_id,  
            postingan_id      : newTeksData.postingan_id,  
            is_active         : newTeksData.is_active,
            is_delete         : newTeksData.is_delete,
        }
    })
    return teks
}

const deleteTeks = async (id) => {
    await prisma.teks.delete({
        where: {
            id: id
        }
    }) 
}

const editTeks = async (id, teksData) => { 
    const teks =  await  prisma.teks.update({
        where:{
            id: id
        },
        data:{  
            judul_teks        : teksData.judul_teks,
            dokumen_teks      : teksData.dokumen_teks,
            deskripsi_teks    : teksData.deskripsi_teks,
            kelas_id          : teksData.kelas_id,
            mata_pelajaran_id : teksData.mata_pelajaran_id,
            postingan_id      : teksData.postingan_id,
            is_active         : teksData.is_active,
            is_delete         : teksData.is_delete ,
        }
    })

    return teks
}

const findTeksByKelPelPosId = async (kelasid, pelajaranid, postinganid) => {
    const teks = await prisma.teks.findFirst({
        where:{
            kelas_id:kelasid, 
            mata_pelajaran_id:pelajaranid, 
            postingan_id:postinganid, 
        }
    }) 
    return teks
}
 

module.exports = {
    findTeks,
    findTeksById,
    insertTeks,
    deleteTeks,
    editTeks,
    findTeksByKelPelPosId
}