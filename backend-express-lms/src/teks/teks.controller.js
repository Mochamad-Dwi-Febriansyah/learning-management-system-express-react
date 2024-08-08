const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllTeks, getTeksById,createTeks, deleteTeksById, editTeksById, getTeksByKelPelPosId } = require( "./teks.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/',roleCheck(['GURU']), async (req,res) => {
    try {
        const teks = await getAllTeks() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat teks',
            data: teks
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
        const teksId = parseInt(req.params.id)
        const teks = await getTeksById(teksId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat teks',
            data: teks
        })
    } catch (error) {
        if (error.message === 'Teks tidak ditemukan') {
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
        body('judul_teks').notEmpty(),
        body('dokumen_teks').notEmpty(),
        body('deskripsi_teks').notEmpty()
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newTeksData = req.body 

        const teks = await createTeks(newTeksData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat teks",
            data: teks
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
        const teksId = parseInt(req.params.id) 
        await deleteTeksById(teksId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus teks"
        })
    } catch (error) {
        if (error.message === 'Teks tidak ditemukan') {
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
    body('judul_teks').notEmpty(),
    body('dokumen_teks').notEmpty(),
    body('deskripsi_teks').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newTeksData = req.body
        const teksId = parseInt(req.params.id) 


        const teks = await editTeksById(teksId, newTeksData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate teks",
            data: teks
        })
    } catch (error) {
        if (error.message === 'Teks tidak ditemukan') {
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
        const teks = await getTeksByKelPelPosId(kelasId, pelajaranId, postinganId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat teks',
            data: teks
        })
    } catch (error) {
        if (error.message === 'Teks tidak ditemukan') {
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