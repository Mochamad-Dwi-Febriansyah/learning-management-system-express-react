const { findMataPelajaran, findMataPelajaranById, insertMataPelajaran, deleteMataPelajaran, editMataPelajaran } = require( "./mata-pelajaran.repository.js")

const getAllMataPelajaran = async () => {
    const mataPelajaran = await findMataPelajaran()

    return mataPelajaran
}

const getMataPelajaranById = async(id) => {
    const mataPelajaran = await findMataPelajaranById(id)
    if (!mataPelajaran) {
        throw new Error('Mata pelajaran tidak ditemukan');
    }
    return mataPelajaran
}

const createMataPelajaran = async(newMataPelajaranData) => {  
    const mataPelajaran = await insertMataPelajaran(newMataPelajaranData)

    return mataPelajaran
}
const deleteMataPelajaranById = async (id) => {
    await getMataPelajaranById(id)
    
    await deleteMataPelajaran(id)
}

const editMataPelajaranById = async (id, mataPelajaranData) => {
    await getMataPelajaranById(id)

    const mataPelajaran = await editMataPelajaran(id, mataPelajaranData)
    
    return mataPelajaran
}
 

module.exports = {
    getAllMataPelajaran,
    getMataPelajaranById,
    createMataPelajaran,
    deleteMataPelajaranById,
    editMataPelajaranById
}