const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllKelasMataPelajaran,getAllKelasMataPelajaranByGuruId, getKelasMataPelajaranById,createKelasMataPelajaran, deleteKelasMataPelajaranById, editKelasMataPelajaranById } = require( "./kelas-mata-pelajaran.service.js")
const roleCheck = require("../../middleware/roleCheck.js");
const jwt = require('jsonwebtoken');

const router = express.Router()

router.get('/',roleCheck(['ADMIN']), async (req,res) => {
    try {
        const kelasMataPelajaran = await getAllKelasMataPelajaran() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kelas mata pelajaran',
            data: kelasMataPelajaran
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

router.get('/me',roleCheck(['GURU']), async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const guruKelas = await getAllKelasMataPelajaranByGuruId(decoded.id) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat guru kelas',
            data: guruKelas
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


router.get('/:id',roleCheck(['ADMIN']), async (req,res) => {
    try {
        const kelasMataPelajaranId = parseInt(req.params.id)
        const kelasMataPelajaran = await getKelasMataPelajaranById(kelasMataPelajaranId)
        if (!kelasMataPelajaran) {
            return res.status(404).json({
              status: "error",
              code: 404,
              message: 'Kelas Mata pelajaran tidak ditemukan',
            });
          } 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kelas mata pelajaran',
            data: kelasMataPelajaran
        })
    } catch (error) {
        if (error.message === 'Kelas mata pelajaran tidak ditemukan') {
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

router.post('/',roleCheck(['ADMIN']), [ 
        body('kelas_id').notEmpty(),
        body('mata_pelajaran_id').notEmpty(),
        body('guru_id').notEmpty() 
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newKelasMataPelajaranData = req.body 

        const kelasMataPelajaran = await createKelasMataPelajaran(newKelasMataPelajaranData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat kelas mata pelajaran",
            data: kelasMataPelajaran
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

router.delete('/:id',roleCheck(['ADMIN']), async (req,res) => {
    try {
        const kelasMataPelajaranId = parseInt(req.params.id) 
        await deleteKelasMataPelajaranById(kelasMataPelajaranId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus kelas mata pelajaran"
        })
    } catch (error) {
        if (error.message === 'Kelas mata pelajaran tidak ditemukan') {
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

router.put('/:id',roleCheck(['ADMIN']), [ 
    body('kelas_id').notEmpty(),
    body('mata_pelajaran_id').notEmpty(),
    body('guru_id').notEmpty() 
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newKelasMataPelajaranData = req.body
        const kelasMataPelajaranId = parseInt(req.params.id) 


        const kelasMataPelajaran = await editKelasMataPelajaranById(kelasMataPelajaranId, newKelasMataPelajaranData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate mata pelajaran",
            data: kelasMataPelajaran
        })
    } catch (error) {
        if (error.message === 'Kelas mata pelajaran tidak ditemukan') {
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