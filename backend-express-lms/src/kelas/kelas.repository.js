const  prisma = require("../db/index.js") 

const findKelas = async () => {
    const kelas = await prisma.kelas.findMany({
        where: { 
            // is_active: true,
            is_delete: false
        }
    })

    return kelas
}

const findKelasById = async (id) => {
    const kelas = await prisma.kelas.findUnique({
        where:{
            id:id, 
        }
    }) 
    return kelas
}

const insertKelas = async (newKelasData) => { 
    const kelas = await prisma.kelas.create({
        data:{  
            nama: newKelasData.nama , 
            is_active      :newKelasData.is_active,
            is_delete     :newKelasData.is_delete ,
        }
    })
    return kelas
}

const deleteKelas = async (id) => {
    await prisma.kelas.delete({
        where: {
            id: id
        }
    }) 
}

const editKelas = async (id, kelasData) => { 
    const kelas =  await  prisma.kelas.update({
        where:{
            id: id
        },
        data:{  
            nama: kelasData.nama , 
            is_active      :kelasData.is_active,
            is_delete     :kelasData.is_delete ,
        }
    })

    return kelas
}
 

module.exports = {
    findKelas,
    findKelasById,
    insertKelas,
    deleteKelas,
    editKelas
}