const { findPengumpulanTugas, findPengumpulanTugasById, insertPengumpulanTugas, deletePengumpulanTugas, editPengumpulanTugas,findPengumpulanTugasByTugId, findPengumpulanTugasByTugSisId } = require("./pengumpulan-tugas.repository.js")

const getAllPengumpulanTugas = async () => {
    const pengumpulanTugas = await findPengumpulanTugas()

    return pengumpulanTugas
}

const getPengumpulanTugasById = async(id) => {
    const pengumpulanTugas = await findPengumpulanTugasById(id)
    if (!pengumpulanTugas) {
        throw new Error('Pengumpulan tugas tidak ditemukan');
    }
    return pengumpulanTugas
}



const createPengumpulanTugas = async(newPengumpulanTugasData) => {  
    const pengumpulanTugas = await insertPengumpulanTugas(newPengumpulanTugasData)

    return pengumpulanTugas
}
const deletePengumpulanTugasById = async (id) => {
    await getPengumpulanTugasById(id)

    await deletePengumpulanTugas(id)
}

const editPengumpulanTugasById = async (id, pengumpulanTugasData) => {
    await getPengumpulanTugasById(id)

    const pengumpulanTugas = await editPengumpulanTugas(id, pengumpulanTugasData)
    
    return pengumpulanTugas
}
 
const getPengumpulanTugasByTugId = async(tugasId) => {
    const pengumpulanTugas = await findPengumpulanTugasByTugId(tugasId)
    if (!pengumpulanTugas) {
        throw new Error('Pengumpulan tugas tidak ditemukan');
    }
    return pengumpulanTugas
}
const getPengumpulanTugasByTugSisId = async(tugasId, siswaId) => {
    const pengumpulanTugas = await findPengumpulanTugasByTugSisId(tugasId, siswaId)
    if (!pengumpulanTugas) {
        throw new Error('Pengumpulan tugas tidak ditemukan');
    }
    return pengumpulanTugas
}

module.exports = {
    getAllPengumpulanTugas,
    getPengumpulanTugasById,
    createPengumpulanTugas,
    getPengumpulanTugasByTugSisId,
    deletePengumpulanTugasById,
    editPengumpulanTugasById,
    getPengumpulanTugasByTugId
}