const  prisma = require("../db/index.js")

const findSiswaKelas = async () => {
    const siswaKelas = await prisma.siswa_Kelas.findMany({
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
            siswa: {
                select: {
                    nis: true,
                    nama: true,
                }
            }
        }
    })

    const formattedData = siswaKelas.map(item => ({
        id: item.id,
        kelas_id: item.kelas_id,
        siswa_id: item.siswa_id,
        created_by_id: item.created_by_id,
        is_active: item.is_active,
        is_delete: item.is_delete,
        createdAt: item.createdAt,
        nama_kelas: item.kelas.nama,
        nama_siswa: item.siswa.nama,
        nis_siswa: item.siswa.nis,
    }));

    return formattedData
}

const findSiswaKelasById = async (guruId) => {
    const siswaKelas = await prisma.siswa_Kelas.findUnique({
        where:{
            guru_id:guruId, 
        }
    }) 

    
    return siswaKelas
}

const insertSiswaKelas = async (newSiswaKelasData) => { 
    const siswaKelas = await prisma.siswa_Kelas.create({
        data:{  
            siswa_id: newSiswaKelasData.siswa_id , 
            kelas_id: newSiswaKelasData.kelas_id ,  
            is_active      :newSiswaKelasData.is_active,
            is_delete     :newSiswaKelasData.is_delete ,
        }
    })
    return siswaKelas
}

const deleteSiswaKelas = async (id) => {
    await prisma.siswa_Kelas.delete({
        where: {
            id: id
        }
    }) 
}

const editSiswaKelas = async (id, siswaKelasData) => { 
    const siswaKelas =  await  prisma.siswa_Kelas.update({
        where:{
            id: id
        },
        data:{  
            siswa_id: siswaKelasData.siswa_id , 
            kelas_id: siswaKelasData.kelas_id ,  
            is_active      :siswaKelasData.is_active,
            is_delete     :siswaKelasData.is_delete ,
        }
    })

    return siswaKelas
}
 

module.exports = {
    findSiswaKelas,
    findSiswaKelasById,
    insertSiswaKelas,
    deleteSiswaKelas,
    editSiswaKelas
}