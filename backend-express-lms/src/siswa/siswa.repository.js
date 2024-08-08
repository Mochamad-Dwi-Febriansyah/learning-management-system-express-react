const  prisma = require("../db/index.js")
const bcrypt  =require("bcrypt" )

const findSiswa = async () => {
    const siswa = await prisma.user.findMany({
        where: {
            user_type: 'SISWA',
            // is_active: true
            is_delete: false,
        }
    })

    return siswa
}

const findSiswaById = async (id) => {
    const siswa = await prisma.user.findUnique({
        where:{
            id:id,
            user_type: 'SISWA'
        }
    }) 
    return siswa
}

const insertSiswa = async (newSiswaData) => {
    const hashedPassword = await bcrypt.hash(newSiswaData.password, 10);
    const parsedTanggalLahir = newSiswaData.tanggal_lahir ? new Date(newSiswaData.tanggal_lahir) : null;
    const siswa = await prisma.user.create({
        data:{ 
            nis: parseInt(newSiswaData.nis),
            nama: newSiswaData.nama ,
            nama_akhir: newSiswaData.nama_akhir,
            email: newSiswaData.email,
            password: hashedPassword,
            jenis_kelamin: newSiswaData.jenis_kelamin,
            tanggal_lahir: parsedTanggalLahir,
            agama: newSiswaData.agama,
            nomor_hp      :newSiswaData.nomor_hp,
            foto_profil    :newSiswaData.foto_profil,
            alamat        :newSiswaData.alamat,
            user_type    :newSiswaData.user_type,
            is_active      :newSiswaData.is_active,
            is_delete     :newSiswaData.is_delete ,
        }
    })
    return siswa
}

const deleteSiswa = async (id) => {
    await prisma.user.delete({
        where: {
            id: id,
            user_type: 'SISWA'
        }
    }) 
}

const editSiswa = async (id, siswaData) => {
    const hashedPassword = await bcrypt.hash(siswaData.password, 10);
    const parsedTanggalLahir = siswaData.tanggal_lahir ? new Date(siswaData.tanggal_lahir) : null;
    const siswa =  await  prisma.user.update({
        where:{
            id: id
        },
        data:{ 
            nis: parseInt(siswaData.nis),
            nama: siswaData.nama ,
            nama_akhir: siswaData.nama_akhir,
            email: siswaData.email,
            password: hashedPassword,
            jenis_kelamin: siswaData.jenis_kelamin,
            tanggal_lahir: parsedTanggalLahir,
            agama: siswaData.agama,
            nomor_hp      :siswaData.nomor_hp,
            foto_profil    :siswaData.foto_profil,
            alamat        :siswaData.alamat,
            user_type    :siswaData.user_type,
            is_active      :siswaData.is_active,
            is_delete     :siswaData.is_delete ,
        }
    })

    return siswa
}

const nisUnique = async (nis) => {
    const existingSiswa = await prisma.user.findUnique({ where: { nis } });
    if (existingSiswa) {
        throw new Error('NIS sudah digunakan');
    }

    return existingSiswa
}
const emailUnique = async (email) => {
    const existingSiswa = await prisma.user.findUnique({ where: { email } });
    if (existingSiswa) {
        throw new Error('Email sudah digunakan');
    }

    return existingSiswa
}

module.exports = {
    findSiswa,
    findSiswaById,
    insertSiswa,
    deleteSiswa,
    editSiswa,
    nisUnique,
    emailUnique
}