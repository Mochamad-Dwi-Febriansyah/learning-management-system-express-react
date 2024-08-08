const  prisma = require("../db/index.js")

const findKelasMataPelajaran = async () => {
    const kelasMataPelajaran = await prisma.kelas_Mata_Pelajaran.findMany({
        where: { 
            // is_active: true,
            is_delete: false,
        },
        include: {
            created: {
                select: {
                nama: true
             }
            },
            kelas: {
                select: {
                    nama: true
                }
            },
            mata_pelajaran: {
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

    const formattedData = kelasMataPelajaran.map(item => ({
        id: item.id,
        kelas_id: item.kelas_id,
        mata_pelajaran_id: item.mata_pelajaran_id,
        created_by_id: item.created_by_id,
        is_active: item.is_active,
        is_delete: item.is_delete,
        createdAt: item.createdAt,
        nama_kelas: item.kelas.nama,
        nama_mata_pelajaran: item.mata_pelajaran.nama,
        nama_guru: item.guru.nama,
        created_by: item.created.nama
    }));

    return formattedData
}


const findKelasMataPelajaranByGuruId = async (guruId) => {  
    const kelasMataPelajaran = await prisma.kelas_Mata_Pelajaran.findMany({
        where:{
            guru_id: guruId,   
            is_delete: false,
        },
        include: {
            created: {
                select: {
                nama: true
             }
            },
            kelas: {
                select: {
                    nama: true
                }
            },
            mata_pelajaran: {
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
    const formattedData = kelasMataPelajaran.map(item => ({
        id: item.id,
        kelas_id: item.kelas_id,
        mata_pelajaran_id: item.mata_pelajaran_id,
        guru_id: item.guru_id,
        created_by_id: item.created_by_id,
        is_active: item.is_active,
        is_delete: item.is_delete,
        createdAt: item.createdAt,
        nama_kelas: item.kelas.nama,
        nama_mata_pelajaran: item.mata_pelajaran.nama,
        nama_guru: item.guru.nama,
        created_by: item.created.nama
    }));

    
    return formattedData
}

const findKelasMataPelajaranById = async (id) => {
    const kelasMataPelajaran = await prisma.kelas_Mata_Pelajaran.findUnique({
        where:{
            id:id, 
        }
    }) 

    
    return kelasMataPelajaran
}

const insertKelasMataPelajaran = async (newKelasMataPelajaranData) => { 
    const kelasMataPelajaran = await prisma.kelas_Mata_Pelajaran.create({
        data:{  
            kelas_id: newKelasMataPelajaranData.kelas_id , 
            mata_pelajaran_id: newKelasMataPelajaranData.mata_pelajaran_id , 
            guru_id: newKelasMataPelajaranData.guru_id , 
            created_by_id: newKelasMataPelajaranData.created_by_id , 
            is_active      :newKelasMataPelajaranData.is_active,
            is_delete     :newKelasMataPelajaranData.is_delete ,
        }
    })
    return kelasMataPelajaran
}

const deleteKelasMataPelajaran = async (id) => {
    await prisma.kelas_Mata_Pelajaran.delete({
        where: {
            id: id
        }
    }) 
}

const editKelasMataPelajaran = async (id, kelasMataPelajaranData) => { 
    const kelasMataPelajaran =  await  prisma.kelas_Mata_Pelajaran.update({
        where:{
            id: id
        },
        data:{  
            kelas_id: kelasMataPelajaranData.kelas_id , 
            mata_pelajaran_id: kelasMataPelajaranData.mata_pelajaran_id , 
            guru_id: kelasMataPelajaranData.guru_id , 
            created_by_id: kelasMataPelajaranData.created_by_id , 
            is_active      :kelasMataPelajaranData.is_active,
            is_delete     :kelasMataPelajaranData.is_delete ,
        }
    })

    return kelasMataPelajaran
}
 

module.exports = {
    findKelasMataPelajaran,
    findKelasMataPelajaranByGuruId,
    findKelasMataPelajaranById,
    insertKelasMataPelajaran,
    deleteKelasMataPelajaran,
    editKelasMataPelajaran
}