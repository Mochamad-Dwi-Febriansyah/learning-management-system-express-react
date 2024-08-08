const { findPostingan, findPostinganByMataPelajaranId,findPostinganById, insertPostingan, deletePostingan, editPostingan, findPostinganByKelPelId } = require("./postingan.repository.js")

const getAllPostingan = async () => {
    const postingan = await findPostingan()

    return postingan
}
const getAllPostinganByMataPelajaranId = async (mataPelajaranId) => {
    const postingan = await findPostinganByMataPelajaranId(mataPelajaranId)

    return postingan
}

const getPostinganById = async(id) => {
    const postingan = await findPostinganById(id)
    if (!postingan) {
        throw new Error('Postingan tidak ditemukan');
    }
    return postingan
}



const createPostingan = async(newPostinganData) => {  
    const postingan = await insertPostingan(newPostinganData)

    return postingan
}
const deletePostinganById = async (id) => {
    await getPostinganById(id)

    await deletePostingan(id)
}

const editPostinganById = async (id, postinganData) => {
    await getPostinganById(id)

    const postingan = await editPostingan(id, postinganData)
    
    return postingan
}
 
const getPostinganByKelPelId = async(kelasid, pelajaranid) => {
    const postingan = await findPostinganByKelPelId(kelasid, pelajaranid)
    if (!postingan) {
        throw new Error('Postingan tidak ditemukan');
    }
    return postingan
}

module.exports = {
    getAllPostingan,
    getAllPostinganByMataPelajaranId,
    getPostinganById,
    createPostingan,
    getPostinganByKelPelId,
    deletePostinganById,
    editPostinganById
}