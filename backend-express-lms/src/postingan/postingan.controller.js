const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllPostingan,getAllPostinganByMataPelajaranId, getPostinganById,createPostingan, deletePostinganById, editPostinganById, getPostinganByKelPelId } = require( "./postingan.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/',  roleCheck(['GURU']), async (req,res) => {
    try {
        const postingan = await getAllPostingan() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat postingan',
            data: postingan
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
router.get('/mata_pelajaran/:mata_pelajaran_id',  roleCheck(['GURU']), async (req,res) => {
    try {
        const mataPelajaranId = parseInt(req.params.mata_pelajaran_id)
        const postingan = await getAllPostinganByMataPelajaranId(mataPelajaranId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat postingan',
            data: postingan
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

router.get('/:id', roleCheck(['GURU']), async (req,res) => {
    try {
        const postinganId = parseInt(req.params.id)
        const postingan = await getPostinganById(postinganId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat postingan',
            data: postingan
        })
    } catch (error) {
        if (error.message === 'Postingan tidak ditemukan') {
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
 
router.post('/', roleCheck(['GURU']), [ 
        body('mata_pelajaran_id').notEmpty(),
        body('kelas_id').notEmpty(),
        body('guru_id').notEmpty(),
        body('nama').notEmpty()
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newPostinganData = req.body 

        const postingan = await createPostingan(newPostinganData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat postingan",
            data: postingan
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

router.delete('/:id', roleCheck(['GURU']), async (req,res) => {
    try {
        const postinganId = parseInt(req.params.id) 
        await deletePostinganById(postinganId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus postingan"
        })
    } catch (error) {
        if (error.message === 'Postingan tidak ditemukan') {
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

router.put('/:id', roleCheck(['GURU']), [ 
    body('mata_pelajaran_id').notEmpty(),
    body('kelas_id').notEmpty(),
    body('guru_id').notEmpty(),
    body('nama').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newPostinganData = req.body
        const postinganId = parseInt(req.params.id) 


        const postingan = await editPostinganById(postinganId, newPostinganData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate postingan",
            data: postingan
        })
    } catch (error) {
        if (error.message === 'Postingan tidak ditemukan') {
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

router.get('/kelas/:kelasid/mata-pelajaran/:matapelajaranid',  roleCheck(['GURU', 'SISWA']), async (req,res) => {
    try {
        const kelasId = parseInt(req.params.kelasid)
        const pelajaranId = parseInt(req.params.matapelajaranid)
        const postingan = await getPostinganByKelPelId(kelasId, pelajaranId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat postingan',
            data: postingan
        })
    } catch (error) {
        if (error.message === 'Postingan tidak ditemukan') {
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