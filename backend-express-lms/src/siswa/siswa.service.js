const { findSiswa, findSiswaById, insertSiswa, deleteSiswa, editSiswa, nisUnique,emailUnique } = require( "./siswa.repository.js")

const getAllSiswa = async () => {
    const siswa = await findSiswa()

    return siswa
}

const getSiswaById = async(id) => {
    const siswa = await findSiswaById(id)
    if (!siswa) {
        throw new Error('Siswa tidak ditemukan');
    }
    return siswa
}

const createSiswa = async(newSiswaData) => {  
    const siswa = await insertSiswa(newSiswaData)

    return siswa
}
const deleteSiswaById = async (id) => {
    await getSiswaById(id)

    await deleteSiswa(id)
}

const editSiswaById = async (id, siswaData) => {
    await getSiswaById(id)

    const siswa = await editSiswa(id, siswaData)
    
    return siswa
}

const isNisUnique = async (nis) => {
    const existingSiswa = await nisUnique(nis)

    return existingSiswa
};
const isEmailUnique = async (email) => {
    const existingSiswa = await emailUnique(email)

    return existingSiswa
};

module.exports = {
    getAllSiswa,
    getSiswaById,
    createSiswa,
    deleteSiswaById,
    editSiswaById,
    isNisUnique,
    isEmailUnique
}