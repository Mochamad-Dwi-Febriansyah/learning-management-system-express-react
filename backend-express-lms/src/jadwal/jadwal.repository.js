const  prisma = require("../db/index.js")

const findKelasMataPelajaran = async () => {
    const kelasMataPelajaran = await prisma.kelas_Mata_Pelajaran.findMany({
        where: { 
            // is_active: true
            is_delete: false,
        }
    })

    return kelasMataPelajaran
}

const findJadwalKelasById = async (kelas_id) => {
    try {
        const jadwal = await prisma.jadwal.findMany({
            where: {
                kelas_id: kelas_id,
            },
            orderBy: {
                minggu_id: 'asc', // Urutkan berdasarkan minggu_id
            },
        });

        // Objek untuk menyimpan data yang sudah dikelompokkan
        const groupedJadwal = {};

        // Iterasi untuk mengelompokkan data berdasarkan minggu_id
        jadwal.forEach((item) => {
            const { minggu_id } = item;
            if (!groupedJadwal[minggu_id]) {
                groupedJadwal[minggu_id] = [];
            }
            groupedJadwal[minggu_id].push(item);
        });

        // Ubah objek menjadi array hasil yang sesuai dengan respons yang diharapkan
        const result = Object.keys(groupedJadwal).map((minggu_id) => ({
            minggu_id: parseInt(minggu_id), // pastikan minggu_id dalam bentuk angka
            jadwal: groupedJadwal[minggu_id],
        }));

        return result;
    } catch (error) {
        console.error("Error fetching jadwal:", error);
        throw error; // Tangani atau lempar error sesuai kebutuhan Anda
    }
};


const insertJadwal = async (newJadwalData) => { 
    await prisma.jadwal.deleteMany({
        where: {
            kelas_id : newJadwalData.kelas_id,
            mata_pelajaran_id : newJadwalData.mata_pelajaran_id,
        }
    })

    const jadwal = await prisma.jadwal.create({
        data:{  
            kelas_id: newJadwalData.kelas_id , 
            mata_pelajaran_id: newJadwalData.mata_pelajaran_id , 
            minggu_id: newJadwalData.minggu_id , 
            waktu_mulai: newJadwalData.waktu_mulai , 
            waktu_selesai: newJadwalData.waktu_selesai , 
            ruang: newJadwalData.ruang , 
            is_active      :newJadwalData.is_active,
            is_delete     :newJadwalData.is_delete ,
        }
    })
    return jadwal
}
 

module.exports = {
    findKelasMataPelajaran,
    findJadwalKelasById,
    insertJadwal
}