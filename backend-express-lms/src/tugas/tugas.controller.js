const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllTugas, getTugasById,createTugas, deleteTugasById, editTugasById, getTugasByKelPelPosId } = require( "./tugas.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/', roleCheck(['GURU']),async (req,res) => {
    try {
        const tugas = await getAllTugas() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat tugas',
            data: tugas
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
})

router.get('/:id',roleCheck(['GURU']), async (req,res) => {
    try {
        const tugasId = parseInt(req.params.id)
        const tugas = await getTugasById(tugasId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat tugas',
            data: tugas
        })
    } catch (error) {
        if (error.message === 'Tugas tidak ditemukan') {
            return res.status(404).json({
              status: 'error',
              code: 404,
              message: error.message,
            });
          }
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
}) 

router.post('/',roleCheck(['GURU']), [ 
        body('mata_pelajaran_id').notEmpty(),
        body('kelas_id').notEmpty(),
        body('postingan_id').notEmpty(),
        body('judul_tugas').notEmpty(),
        body('deskripsi_tugas').notEmpty(),
        body('tugas_tanggal').notEmpty(),
        body('pengumpulan_mulai').notEmpty(),
        body('pengumpulan_selesai').notEmpty(),
        body('dokumen_tugas').notEmpty() 
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newTugasData = req.body 

        const tugas = await createTugas(newTugasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat tugas",
            data: tugas
        })
    } catch (error) { 
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
})

router.delete('/:id',roleCheck(['GURU']), async (req,res) => {
    try {
        const tugasId = parseInt(req.params.id) 
        await deleteTugasById(tugasId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus tugas"
        })
    } catch (error) {
        if (error.message === 'Tugas tidak ditemukan') {
            return res.status(404).json({
              status: 'error',
              code: 404,
              message: error.message,
            });
          }
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
})

router.put('/:id',roleCheck(['GURU']), [ 
    body('mata_pelajaran_id').notEmpty(),
    body('kelas_id').notEmpty(),
    body('postingan_id').notEmpty(),
    body('judul_tugas').notEmpty(),
    body('deskripsi_tugas').notEmpty(),
    body('tugas_tanggal').notEmpty(),
    body('pengumpulan_mulai').notEmpty(),
    body('pengumpulan_selesai').notEmpty(),
    body('dokumen_tugas').notEmpty() 
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newTugasData = req.body
        const tugasId = parseInt(req.params.id) 


        const tugas = await editTugasById(tugasId, newTugasData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate tugas",
            data: tugas
        })
    } catch (error) {
        if (error.message === 'Tugas tidak ditemukan') {
            return res.status(404).json({
              status: 'error',
              code: 404,
              message: error.message,
            });
          }
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
})

router.get('/kelas/:kelasid/mata-pelajaran/:matapelajaranid/postingan/:postinganid',roleCheck(['GURU', 'SISWA']), async (req,res) => {
    try {
        const kelasId = parseInt(req.params.kelasid)
        const pelajaranId = parseInt(req.params.matapelajaranid)
        const postinganId = parseInt(req.params.postinganid)
        const tugas = await getTugasByKelPelPosId(kelasId, pelajaranId, postinganId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat tugas',
            data: tugas
        })
    } catch (error) {
        if (error.message === 'Tugas tidak ditemukan') {
            return res.status(404).json({
              status: 'error',
              code: 404,
              message: error.message,
            });
          }
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
})

module.exports =  router