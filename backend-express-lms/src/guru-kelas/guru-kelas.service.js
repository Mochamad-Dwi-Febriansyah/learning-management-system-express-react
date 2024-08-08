const { findGuruKelas,findAllGuruKelasByGuruId, findGuruKelasById, insertGuruKelas, deleteGuruKelas, editGuruKelas } = require("./guru-kelas.repository.js")

const getAllGuruKelas = async () => {
    const guruKelas = await findGuruKelas()

    return guruKelas
}

const getAllGuruKelasByGuruId = async(guruId) => {
    
    const guruKelas = await findAllGuruKelasByGuruId(guruId)
    if (!guruKelas) {
        throw new Error('Guru kelas tidak ditemukan');
    }
    return guruKelas
}
const getGuruKelasById = async(id) => {
    const guruKelas = await findGuruKelasById(id)
    if (!guruKelas) {
        throw new Error('Guru kelas tidak ditemukan');
    }
    return guruKelas
}

const createGuruKelas = async(newGuruKelasData) => {  
    const guruKelas = await insertGuruKelas(newGuruKelasData)

    return guruKelas
}
const deleteGuruKelasById = async (id) => {
    await getGuruKelasById(id)
    
    await deleteGuruKelas(id)
}

const editGuruKelasById = async (id, guruKelasData) => {
    await getGuruKelasById(id)

    const guruKelas = await editGuruKelas(id, guruKelasData)
    
    return guruKelas
}
 

module.exports = {
    getAllGuruKelas,
    getAllGuruKelasByGuruId,
    getGuruKelasById,
    createGuruKelas,
    deleteGuruKelasById,
    editGuruKelasById
}