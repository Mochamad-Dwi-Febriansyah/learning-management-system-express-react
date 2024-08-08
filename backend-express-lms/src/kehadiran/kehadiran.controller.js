const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllKehadiran, getKehadiranById,createKehadiran, deleteKehadiranById, editKehadiranById, getKehadiranByKelPelId } = require( "./kehadiran.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/', roleCheck(['GURU']), async (req,res) => {
    try {
        const kehadiran = await getAllKehadiran() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kehadiran',
            data: kehadiran
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
        const kehadiranId = parseInt(req.params.id)
        const kehadiran = await getKehadiranById(kehadiranId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kehadiran',
            data: kehadiran
        })
    } catch (error) {
        if (error.message === 'Kehadiran tidak ditemukan') {
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
        body('kelas_id').notEmpty(),
        body('mata_pelajaran_id').notEmpty(),
        body('siswa_id').notEmpty(),
        body('jadwal_id').notEmpty(),
        body('tanggal_kehadiran').notEmpty(),
        body('kehadiran_tipe').notEmpty(),
        body('dibuat_oleh').notEmpty()
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newKehadiranData = req.body 

        const kehadiran = await createKehadiran(newKehadiranData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat kehadiran",
            data: kehadiran
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
        const kehadiranId = parseInt(req.params.id) 
        await deleteKehadiranById(kehadiranId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus kehadiran"
        })
    } catch (error) {
        if (error.message === 'Kehadiran tidak ditemukan') {
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
    body('kelas_id').notEmpty(),
    body('mata_pelajaran_id').notEmpty(),
    body('siswa_id').notEmpty(),
    body('jadwal_id').notEmpty(),
    body('tanggal_kehadiran').notEmpty(),
    body('kehadiran_tipe').notEmpty(),
    body('dibuat_oleh').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newKehadiranData = req.body
        const kehadiranId = parseInt(req.params.id) 


        const kehadiran = await editKehadiranById(kehadiranId, newKehadiranData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate kehadiran",
            data: kehadiran
        })
    } catch (error) {
        if (error.message === 'Kehadiran tidak ditemukan') {
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

router.get('/kelas/:kelasid/mata-pelajaran/:matapelajaranid',roleCheck(['GURU', 'SISWA']), async (req,res) => {
    try {
        const kelasId = parseInt(req.params.kelasid)
        const pelajaranId = parseInt(req.params.matapelajaranid)
        const kehadiran = await getKehadiranByKelPelId(kelasId, pelajaranId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kehadiran',
            data: kehadiran
        })
    } catch (error) {
        if (error.message === 'Kehadiran tidak ditemukan') {
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