const { findGuru, findGuruById, insertGuru, deleteGuru, editGuru, nisUnique, emailUnique } = require( "./guru.repository.js")

const getAllGuru = async () => {
    const guru = await findGuru()

    return guru
}

const getGuruById = async(id) => {
    const guru = await findGuruById(id)
    if (!guru) {
        throw new Error('Guru tidak ditemukan');
    }
    return guru
}

const createGuru = async(newGuruData) => {  
    const guru = await insertGuru(newGuruData)

    return guru
}
const deleteGuruById = async (id) => {
    await getGuruById(id)

    await deleteGuru(id)
}

const editGuruById = async (id, guruData) => {
    await getGuruById(id)

    const guru = await editGuru(id, guruData)
    
    return guru
}

const isNisUnique = async (nis) => {
    const existingGuru = await nisUnique(nis)

    return existingGuru
};
const isEmailUnique = async (email) => {
    const existingGuru = await emailUnique(email)

    return existingGuru
};

module.exports = {
    getAllGuru,
    getGuruById,
    createGuru,
    deleteGuruById,
    editGuruById,
    isNisUnique,
    isEmailUnique
}