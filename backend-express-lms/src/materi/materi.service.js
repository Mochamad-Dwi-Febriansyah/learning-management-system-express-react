const { findMateri, findMateriById, insertMateri, deleteMateri, editMateri, findMateriByKelPelPosId } = require("./materi.repository.js")

const getAllMateri = async () => {
    const materi = await findMateri()

    return materi
}

const getMateriById = async(id) => {
    const materi = await findMateriById(id)
    if (!materi) {
        throw new Error('Materi tidak ditemukan');
    }
    return materi
}



const createMateri = async(newMateriData) => {  
    const materi = await insertMateri(newMateriData)

    return materi
}
const deleteMateriById = async (id) => {
    await getMateriById(id)

    await deleteMateri(id)
}

const editMateriById = async (id, materiData) => {
    await getMateriById(id)

    const materi = await editMateri(id, materiData)
    
    return materi
}
 
const getMateriByKelPelPosId = async(kelasid, pelajaranid, postinganid) => {
    const materi = await findMateriByKelPelPosId(kelasid, pelajaranid, postinganid)
    if (!materi) {
        throw new Error('Materi tidak ditemukan');
    }
    return materi
}

module.exports = {
    getAllMateri,
    getMateriById,
    createMateri,
    getMateriByKelPelPosId,
    deleteMateriById,
    editMateriById
}