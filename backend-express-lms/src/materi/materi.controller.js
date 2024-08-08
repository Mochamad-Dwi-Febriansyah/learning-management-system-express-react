const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllMateri, getMateriById,createMateri, deleteMateriById, editMateriById, getMateriByKelPelPosId } = require( "./materi.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/',roleCheck(['GURU']), async (req,res) => {
    try {
        const materi = await getAllMateri() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat materi',
            data: materi
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

router.get('/:id', roleCheck(['GURU']),async (req,res) => {
    try {
        const materiId = parseInt(req.params.id)
        const materi = await getMateriById(materiId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat materi',
            data: materi
        })
    } catch (error) {
        if (error.message === 'Materi tidak ditemukan') {
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

router.post('/', roleCheck(['GURU']),[ 
        body('mata_pelajaran_id').notEmpty(),
        body('kelas_id').notEmpty(),
        body('postingan_id').notEmpty(),
        body('judul_materi').notEmpty(),
        body('deskripsi_materi').notEmpty()
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newMateriData = req.body 

        const materi = await createMateri(newMateriData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat materi",
            data: materi
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
        const materiId = parseInt(req.params.id) 
        await deleteMateriById(materiId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus materi"
        })
    } catch (error) {
        if (error.message === 'Materi tidak ditemukan') {
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
    body('judul_materi').notEmpty(),
    body('deskripsi_materi').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newMateriData = req.body
        const materiId = parseInt(req.params.id) 


        const materi = await editMateriById(materiId, newMateriData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate materi",
            data: materi
        })
    } catch (error) {
        if (error.message === 'Materi tidak ditemukan') {
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
        const materi = await getMateriByKelPelPosId(kelasId, pelajaranId, postinganId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat materi',
            data: materi
        })
    } catch (error) {
        if (error.message === 'Materi tidak ditemukan') {
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