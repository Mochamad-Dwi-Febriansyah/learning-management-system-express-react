const { findTeks, findTeksById, insertTeks, deleteTeks, editTeks, findTeksByKelPelPosId } = require("./teks.repository.js")

const getAllTeks = async () => {
    const teks = await findTeks()

    return teks
}

const getTeksById = async(id) => {
    const teks = await findTeksById(id)
    if (!teks) {
        throw new Error('Teks tidak ditemukan');
    }
    return teks
}



const createTeks = async(newTeksData) => {  
    const teks = await insertTeks(newTeksData)

    return teks
}
const deleteTeksById = async (id) => {
    await getTeksById(id)

    await deleteTeks(id)
}

const editTeksById = async (id, teksData) => {
    await getTeksById(id)

    const teks = await editTeks(id, teksData)
    
    return teks
}
 
const getTeksByKelPelPosId = async(kelasid, pelajaranid, postinganid) => {
    const teks = await findTeksByKelPelPosId(kelasid, pelajaranid, postinganid)
    if (!teks) {
        throw new Error('Teks tidak ditemukan');
    }
    return teks
}

module.exports = {
    getAllTeks,
    getTeksById,
    createTeks,
    getTeksByKelPelPosId,
    deleteTeksById,
    editTeksById
}