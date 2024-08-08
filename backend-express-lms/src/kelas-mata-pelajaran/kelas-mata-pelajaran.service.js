const { findKelasMataPelajaran,findKelasMataPelajaranByGuruId, findKelasMataPelajaranById, insertKelasMataPelajaran, deleteKelasMataPelajaran, editKelasMataPelajaran } = require( "./kelas-mata-pelajaran.repository.js")

const getAllKelasMataPelajaran = async () => {
    const kelasMataPelajaran = await findKelasMataPelajaran()

    return kelasMataPelajaran
}

const getAllKelasMataPelajaranByGuruId = async(guruId) => {
    const kelasMataPelajaran = await findKelasMataPelajaranByGuruId(guruId)
    if (!kelasMataPelajaran) {
        throw new Error('Kelas mata pelajaran tidak ditemukan');
    }
    return kelasMataPelajaran
}
const getKelasMataPelajaranById = async(id) => {
    const kelasMataPelajaran = await findKelasMataPelajaranById(id)
    if (!kelasMataPelajaran) {
        throw new Error('Kelas mata pelajaran tidak ditemukan');
    }
    return kelasMataPelajaran
}

const createKelasMataPelajaran = async(newKelasMataPelajaranData) => {  
    const kelasMataPelajaran = await insertKelasMataPelajaran(newKelasMataPelajaranData)

    return kelasMataPelajaran
}
const deleteKelasMataPelajaranById = async (id) => {
    await getKelasMataPelajaranById(id)
    
    await deleteKelasMataPelajaran(id)
}

const editKelasMataPelajaranById = async (id, mataPelajaranData) => {
    await getKelasMataPelajaranById(id)

    const kelasMataPelajaran = await editKelasMataPelajaran(id, mataPelajaranData)
    
    return kelasMataPelajaran
}
 

module.exports = {
    getAllKelasMataPelajaran,
    getAllKelasMataPelajaranByGuruId,
    getKelasMataPelajaranById,
    createKelasMataPelajaran,
    deleteKelasMataPelajaranById,
    editKelasMataPelajaranById
}