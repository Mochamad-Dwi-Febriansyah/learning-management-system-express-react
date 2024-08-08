const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllGuruKelas, getGuruKelasById,getAllGuruKelasByGuruId,createGuruKelas, deleteGuruKelasById, editGuruKelasById } = require( "./guru-kelas.service.js")
const roleCheck = require("../../middleware/roleCheck.js");
const jwt = require('jsonwebtoken');

const router = express.Router()

router.get('/',roleCheck(['ADMIN']), async (req,res) => {
    try {
        const guruKelas = await getAllGuruKelas() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat guru kelas',
            data: guruKelas,  
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
        const guruKelas = await getAllGuruKelasByGuruId(decoded.id) 
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
        const guruKelasId = parseInt(req.params.id)
        const guruKelas = await getGuruKelasById(guruKelasId)
        if (!guruKelas) {
            return res.status(404).json({
              status: "error",
              code: 404,
              message: 'Guru kelas tidak ditemukan',
            });
          } 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat guru kelas',
            data: guruKelas
        })
    } catch (error) {
        if (error.message === 'Guru kelas tidak ditemukan') {
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
        body('guru_id').notEmpty(),
        body('kelas_id').notEmpty()
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newGuruKelasData = req.body 

        const guruKelas = await createGuruKelas(newGuruKelasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat guru kelas",
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

router.delete('/:id',roleCheck(['ADMIN']), async (req,res) => {
    try {
        const guruKelasId = parseInt(req.params.id) 
        await deleteGuruKelasById(guruKelasId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus guru kelas"
        })
    } catch (error) {
        if (error.message === 'Guru kelas tidak ditemukan') {
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
    body('guru_id').notEmpty(),
    body('kelas_id').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newGuruKelasData = req.body
        const guruKelasId = parseInt(req.params.id) 


        const guruKelas = await editGuruKelasById(guruKelasId, newGuruKelasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate guru kelas",
            data: guruKelas
        })
    } catch (error) {
        if (error.message === 'Guru kelas tidak ditemukan') {
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