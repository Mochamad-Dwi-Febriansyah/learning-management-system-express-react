const { findKelasMataPelajaran, findJadwalByKelasId  , insertJadwal } = require( "./jadwal.repository.js")

const getAllKelasMataPelajaran = async () => {
    const kelasMataPelajaran = await findKelasMataPelajaran()

    return kelasMataPelajaran
}

const getJadwalKelasById = async(kelas_id) => {
    const jadwal = await findJadwalByKelasId(kelas_id)
    if (!jadwal) {
        throw new Error('Jadwal tidak ditemukan');
    }
    return jadwal
}

const createJadwal = async(newJadwalData) => {
    // const cek = await cekJadwal(newJadwalData)
    const jadwal = await insertJadwal(newJadwalData)

    return jadwal
}
 

module.exports = {
    getAllKelasMataPelajaran,
    getJadwalKelasById,
    createJadwal
}