const { findTugas, findTugasById, insertTugas, deleteTugas, editTugas, findTugasByKelPelPosId } = require("./tugas.repository.js")

const getAllTugas = async () => {
    const tugas = await findTugas()

    return tugas
}

const getTugasById = async(id) => {
    const tugas = await findTugasById(id)
    if (!tugas) {
        throw new Error('Tugas tidak ditemukan');
    }
    return tugas
}



const createTugas = async(newTugasData) => {  
    const tugas = await insertTugas(newTugasData)

    return tugas
}
const deleteTugasById = async (id) => {
    await getTugasById(id)

    await deleteTugas(id)
}

const editTugasById = async (id, tugasData) => {
    await getTugasById(id)

    const tugas = await editTugas(id, tugasData)
    
    return tugas
}
 
const getTugasByKelPelPosId = async(kelasid, pelajaranid, postinganid) => {
    const tugas = await findTugasByKelPelPosId(kelasid, pelajaranid, postinganid)
    if (!tugas) {
        throw new Error('Tugas tidak ditemukan');
    }
    return tugas
}

module.exports = {
    getAllTugas,
    getTugasById,
    createTugas,
    getTugasByKelPelPosId,
    deleteTugasById,
    editTugasById
}