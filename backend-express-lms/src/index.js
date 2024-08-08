const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const { accessValidation } = require("../middleware/authCheck.js"); 

const authController = require("./auth/auth.controller.js");
const siswaController = require("./siswa/siswa.controller.js");
const guruController = require("./guru/guru.controller.js");
const kelasController = require("./kelas/kelas.controller.js");
const siswaKelasController = require("./siswa-kelas/siswa-kelas.controller.js");
const guruKelasController = require("./guru-kelas/guru-kelas.controller.js");
const mataPelajaranController = require("./mata-pelajaran/mata-pelajaran.controller.js");
const kelasMataPelajaranController = require("./kelas-mata-pelajaran/kelas-mata-pelajaran.controller.js");
const jadwalController = require("./jadwal/jadwal.controller.js");

const postinganController = require("./postingan/postingan.controller.js");
const materiController = require("./materi/materi.controller.js");
const tugasController = require("./tugas/tugas.controller.js");
const teksController = require("./teks/teks.controller.js");

const pengumpulanTugasController= require("./pengumpulan-tugas/pengumpulan-tugas.controller.js");

const kehadiranController= require("./kehadiran/kehadiran.controller.js");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
    keyGenerator: function (req /*, res */) {
        // Menggunakan alamat IP sebagai kunci (default behavior)
        return req.ip;
    },
});

app.use(limiter);
app.use(cors());
app.use(express.json());

app.use('/api/auth', authController);

app.use('/api/siswa', accessValidation,  siswaController);
app.use('/api/guru', accessValidation, guruController);
app.use('/api/kelas', accessValidation, kelasController);
app.use('/api/siswa-kelas', accessValidation, siswaKelasController);
app.use('/api/guru-kelas', accessValidation, guruKelasController);
app.use('/api/mata-pelajaran', accessValidation,  mataPelajaranController);
app.use('/api/kelas-mata-pelajaran', accessValidation,  kelasMataPelajaranController);
app.use('/api/jadwal', accessValidation,  jadwalController);

app.use('/api/postingan', accessValidation, postinganController);
app.use('/api/materi', accessValidation,  materiController);
app.use('/api/tugas', accessValidation,  tugasController);
app.use('/api/teks', accessValidation,  teksController);

app.use('/api/pengumpulan-tugas', accessValidation, pengumpulanTugasController);

app.use('/api/kehadiran', accessValidation, kehadiranController);

app.listen(PORT, () => {
    console.log(`Server berjalan di PORT ${PORT}`);
});
