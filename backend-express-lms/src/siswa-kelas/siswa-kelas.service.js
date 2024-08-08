const { findSiswaKelas, findSiswaKelasById, insertSiswaKelas, deleteSiswaKelas, editSiswaKelas } = require( "./siswa-kelas.repository.js")

const getAllSiswaKelas = async () => {
    const siswaKelas = await findSiswaKelas()

    return siswaKelas
}

const getSiswaKelasById = async(id) => {
    const siswaKelas = await findSiswaKelasById(id)
    if (!siswaKelas) {
        throw new Error('Siswa kelas tidak ditemukan');
    }
    return siswaKelas
}

const createSiswaKelas = async(newSiswaKelasData) => {  
    const siswaKelas = await insertSiswaKelas(newSiswaKelasData)

    return siswaKelas
}
const deleteSiswaKelasById = async (id) => {
    await getSiswaKelasById(id)
    
    await deleteSiswaKelas(id)
}

const editSiswaKelasById = async (id, siswaKelasData) => {
    await getSiswaKelasById(id)

    const siswaKelas = await editSiswaKelas(id, siswaKelasData)
    
    return siswaKelas
}
 

module.exports = {
    getAllSiswaKelas,
    getSiswaKelasById,
    createSiswaKelas,
    deleteSiswaKelasById,
    editSiswaKelasById
}