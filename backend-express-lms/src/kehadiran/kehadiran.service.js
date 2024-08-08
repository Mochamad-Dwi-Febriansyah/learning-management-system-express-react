const { findKehadiran, findKehadiranById, insertKehadiran, deleteKehadiran, editKehadiran, findKehadiranByKelPelId } = require("./kehadiran.repository.js")

const getAllKehadiran = async () => {
    const kehadiran = await findKehadiran()

    return kehadiran
}

const getKehadiranById = async(id) => {
    const kehadiran = await findKehadiranById(id)
    if (!kehadiran) {
        throw new Error('Kehadiran tidak ditemukan');
    }
    return kehadiran
}



const createKehadiran = async(newKehadiranData) => {  
    const kehadiran = await insertKehadiran(newKehadiranData)

    return kehadiran
}
const deleteKehadiranById = async (id) => {
    await getKehadiranById(id)

    await deleteKehadiran(id)
}

const editKehadiranById = async (id, kehadiranData) => {
    await getKehadiranById(id)

    const kehadiran = await editKehadiran(id, kehadiranData)
    
    return kehadiran
}
 
const getKehadiranByKelPelId = async(kelasid, pelajaranid) => {
    const kehadiran = await findKehadiranByKelPelId(kelasid, pelajaranid)
    if (!kehadiran) {
        throw new Error('Kehadiran tidak ditemukan');
    }
    return kehadiran
}

module.exports = {
    getAllKehadiran,
    getKehadiranById,
    createKehadiran,
    getKehadiranByKelPelId,
    deleteKehadiranById,
    editKehadiranById
}