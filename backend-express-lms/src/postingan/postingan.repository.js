const  prisma = require("../db/index.js") 

const findPostingan = async () => {
    const postingan = await prisma.postingan.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })

    return postingan
}
const findPostinganByMataPelajaranId = async (mataPelajaranId) => {
    const postingan = await prisma.postingan.findMany({
        where: { 
            // is_active: true
            mata_pelajaran_id: mataPelajaranId,
            is_delete: false,
        }
    })

    return postingan
}


const findPostinganById = async (id) => {
    const postingan = await prisma.postingan.findUnique({
        where:{
            id:id, 
        }
    }) 
    return postingan
}


const insertPostingan = async (newPostinganData) => { 
    const postingan = await prisma.postingan.create({
        data:{  
            nama: newPostinganData.nama , 
            kelas_id: newPostinganData.kelas_id , 
            mata_pelajaran_id: newPostinganData.mata_pelajaran_id, 
            guru_id: newPostinganData.guru_id , 
            is_active      :newPostinganData.is_active,
            is_delete     :newPostinganData.is_delete ,
        }
    })
    return postingan
}

const deletePostingan = async (id) => {
    await prisma.postingan.delete({
        where: {
            id: id
        }
    }) 
}

const editPostingan = async (id, postinganData) => { 
    const postingan =  await  prisma.postingan.update({
        where:{
            id: id
        },
        data:{  
            nama: postinganData.nama , 
            kelas_id: postinganData.kelas_id , 
            mata_pelajaran_id: postinganData.mata_pelajaran_id , 
            guru_id: postinganData.guru_id , 
            is_active      :postinganData.is_active,
            is_delete     :postinganData.is_delete ,
        }
    })

    return postingan
}

const findPostinganByKelPelId = async (kelasid, pelajaranid) => {
    const postingan = await prisma.postingan.findFirst({
        where:{
            kelas_id:kelasid, 
            mata_pelajaran_id:pelajaranid, 
        }
    }) 
    return postingan
}
 

module.exports = {
    findPostingan,
    findPostinganByMataPelajaranId,
    findPostinganById,
    insertPostingan,
    deletePostingan,
    editPostingan,
    findPostinganByKelPelId
}