const  prisma = require("../db/index.js")
const bcrypt  =require("bcrypt" )

const findGuru = async () => {
    const guru = await prisma.user.findMany({
        where: {
            user_type: 'GURU',
            // is_active: true
            is_delete: false,
        }
    })

    return guru
}

const findGuruById = async (id) => {
    const guru = await prisma.user.findUnique({
        where:{
            id:id,
            user_type: 'GURU'
        }
    }) 
    return guru
}

const insertGuru = async (newGuruData) => {
    const hashedPassword = await bcrypt.hash(newGuruData.password, 10);
    const parsedTanggalLahir = newGuruData.tanggal_lahir ? new Date(newGuruData.tanggal_lahir) : null;
    const guru = await prisma.user.create({
        data:{ 
            nis: parseInt(newGuruData.nis),
            nama: newGuruData.nama ,
            nama_akhir: newGuruData.nama_akhir,
            email: newGuruData.email,
            password: hashedPassword,
            jenis_kelamin: newGuruData.jenis_kelamin,
            tanggal_lahir: parsedTanggalLahir,
            agama: newGuruData.agama,
            nomor_hp      :newGuruData.nomor_hp,
            foto_profil    :newGuruData.foto_profil,
            alamat        :newGuruData.alamat,
            user_type    :newGuruData.user_type,
            is_active      :newGuruData.is_active,
            is_delete     :newGuruData.is_delete ,
        }
    })
    return guru
}

const deleteGuru = async (id) => {
    await prisma.user.delete({
        where: {
            id: id,
            user_type: 'GURU'
        }
    }) 
}

const editGuru = async (id, guruData) => {
    const hashedPassword = await bcrypt.hash(guruData.password, 10);
    const parsedTanggalLahir = guruData.tanggal_lahir ? new Date(guruData.tanggal_lahir) : null;
    const guru =  await  prisma.user.update({
        where:{
            id: id
        },
        data:{ 
            nis: parseInt(guruData.nis),
            nama: guruData.nama ,
            nama_akhir: guruData.nama_akhir,
            email: guruData.email,
            password: hashedPassword,
            jenis_kelamin: guruData.jenis_kelamin,
            tanggal_lahir: parsedTanggalLahir,
            agama: guruData.agama,
            nomor_hp      :guruData.nomor_hp,
            foto_profil    :guruData.foto_profil,
            alamat        :guruData.alamat,
            user_type    :guruData.user_type,
            is_active      :guruData.is_active,
            is_delete     :guruData.is_delete ,
        }
    })

    return guru
}

const nisUnique = async (nis) => {
    const existingGuru = await prisma.user.findUnique({ where: { nis } });
    if (existingGuru) {
        throw new Error('NIS sudah digunakan');
    }

    return existingGuru
}
const emailUnique = async (email) => {
    const existingGuru = await prisma.user.findUnique({ where: { email } });
    if (existingGuru) {
        throw new Error('Email sudah digunakan');
    }

    return existingGuru
}

module.exports = {
    findGuru,
    findGuruById,
    insertGuru,
    deleteGuru,
    editGuru,
    nisUnique,
    emailUnique
}