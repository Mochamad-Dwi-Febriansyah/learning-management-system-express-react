const  prisma = require("../db/index.js")

const findMataPelajaran = async () => {
    const mataPelajaran = await prisma.mata_Pelajaran.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        },
        include :{

            created: {
                select: {
                    nama: true
                }
            },
        }
    })
    const formattedData = mataPelajaran.map(item => ({
        id: item.id,
        nama: item.nama, 
        created_by_id: item.created_by_id,
        is_active: item.is_active,
        is_delete: item.is_delete,
        createdAt: item.createdAt,  
        created_by: item.created.nama
    }));

    return formattedData
}

const findMataPelajaranById = async (id) => {
    const mataPelajaran = await prisma.mata_Pelajaran.findUnique({
        where:{
            id:id, 
        }
    }) 

    
    return mataPelajaran
}

const insertMataPelajaran = async (newMataPelajaranData) => { 
    const mataPelajaran = await prisma.mata_Pelajaran.create({
        data:{  
            nama: newMataPelajaranData.nama , 
            created_by_id: newMataPelajaranData.created_by_id , 
            is_active      :newMataPelajaranData.is_active,
            is_delete     :newMataPelajaranData.is_delete ,
        }
    })
    return mataPelajaran
}

const deleteMataPelajaran = async (id) => {
    await prisma.mata_Pelajaran.delete({
        where: {
            id: id
        }
    }) 
}

const editMataPelajaran = async (id, mataPelajaranData) => { 
    const kelas =  await  prisma.mata_Pelajaran.update({
        where:{
            id: id
        },
        data:{  
            nama: mataPelajaranData.nama , 
            created_by_id: mataPelajaranData.created_by_id , 
            is_active      :mataPelajaranData.is_active,
            is_delete     :mataPelajaranData.is_delete ,
        }
    })

    return kelas
}
 

module.exports = {
    findMataPelajaran,
    findMataPelajaranById,
    insertMataPelajaran,
    deleteMataPelajaran,
    editMataPelajaran
}