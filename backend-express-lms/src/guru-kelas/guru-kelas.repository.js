const  prisma = require("../db/index.js")

const findGuruKelas = async () => {
    const guruKelas = await prisma.guru_Kelas.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        },
        include: { 
            kelas: {
                select: {
                    nama: true
                }
            },
            guru: {
                select: {
                    nama: true
                }
            }
        }
    })

    const formattedData = guruKelas.map(item => ({
        id: item.id,
        kelas_id: item.kelas_id,
        guru_id: item.guru_id,
        created_by_id: item.created_by_id,
        is_active: item.is_active,
        is_delete: item.is_delete,
        createdAt: item.createdAt,
        nama_kelas: item.kelas.nama,
        nama_guru: item.guru.nama
    }));

    return formattedData
}



const findAllGuruKelasByGuruId = async (guruId) => { 
    
    const guruKelas = await prisma.guru_Kelas.findMany({
        where:{
            guru_id: guruId,   
            is_delete: false,
        },
        include: { 
            kelas: {
                select: {
                    nama: true
                }
            },
        }
    }) 
    const formattedData = guruKelas.map(item => ({
        id: item.id,
        kelas_id: item.kelas_id,
        guru_id: item.guru_id, 
        is_active: item.is_active,
        is_delete: item.is_delete,
        createdAt: item.createdAt,
        nama_kelas: item.kelas.nama, 
    }));

    
    return formattedData
}
const findGuruKelasById = async (id) => {
    const guruKelas = await prisma.guru_Kelas.findUnique({
        where:{
            id:id, 
        }
    }) 

    
    return guruKelas
}

const insertGuruKelas = async (newGuruKelasData) => { 
    const guruKelas = await prisma.guru_Kelas.create({
        data:{  
            guru_id: newGuruKelasData.guru_id , 
            kelas_id: newGuruKelasData.kelas_id ,  
            is_active      :newGuruKelasData.is_active,
            is_delete     :newGuruKelasData.is_delete ,
        }
    })
    return guruKelas
}

const deleteGuruKelas = async (id) => {
    await prisma.guru_Kelas.delete({
        where: {
            id: id
        }
    }) 
}

const editGuruKelas = async (id, guruKelasData) => { 
    const guruKelas =  await  prisma.guru_Kelas.update({
        where:{
            id: id
        },
        data:{  
            guru_id: guruKelasData.guru_id , 
            kelas_id: guruKelasData.kelas_id ,  
            is_active      :guruKelasData.is_active,
            is_delete     :guruKelasData.is_delete ,
        }
    })

    return guruKelas
}
 

module.exports = {
    findGuruKelas,
    findAllGuruKelasByGuruId,
    findGuruKelasById,
    insertGuruKelas,
    deleteGuruKelas,
    editGuruKelas
}