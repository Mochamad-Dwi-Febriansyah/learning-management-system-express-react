const { findKelas, findKelasById, insertKelas, deleteKelas, editKelas } = require("./kelas.repository.js")

const getAllKelas = async () => {
    const kelas = await findKelas()

    return kelas
}

const getKelasById = async(id) => {
    const kelas = await findKelasById(id)
    if (!kelas) {
        throw new Error('Kelas tidak ditemukan');
    }
    return kelas
}

const createKelas = async(newKelasData) => {  
    const kelas = await insertKelas(newKelasData)

    return kelas
}
const deleteKelasById = async (id) => {
    await getKelasById(id)

    await deleteKelas(id)
}

const editKelasById = async (id, kelasData) => {
    await getKelasById(id)

    const kelas = await editKelas(id, kelasData)
    
    return kelas
}
 

module.exports = {
    getAllKelas,
    getKelasById,
    createKelas,
    deleteKelasById,
    editKelasById
}