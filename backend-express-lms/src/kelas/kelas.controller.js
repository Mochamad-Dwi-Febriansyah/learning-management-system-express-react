const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllKelas, getKelasById,createKelas, deleteKelasById, editKelasById } = require( "./kelas.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/', roleCheck(['ADMIN']), async (req,res) => {
    try {
        const kelas = await getAllKelas() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kelas',
            data: kelas
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

router.get('/:id', roleCheck(['ADMIN']), async (req,res) => {
    try {
        const kelasId = parseInt(req.params.id)
        const kelas = await getKelasById(kelasId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat kelas',
            data: kelas
        })
    } catch (error) {
        if (error.message === 'Kelas tidak ditemukan') {
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



router.post('/', roleCheck(['ADMIN']), [ 
        body('nama').notEmpty() 
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newKelasData = req.body 

        const kelas = await createKelas(newKelasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat kelas",
            data: kelas
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

router.delete('/:id', roleCheck(['ADMIN']), async (req,res) => {
    try {
        const kelasId = parseInt(req.params.id) 
        await deleteKelasById(kelasId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus kelas"
        })
    } catch (error) {
        if (error.message === 'Kelas tidak ditemukan') {
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

router.put('/:id', roleCheck(['ADMIN']), [ 
        body('nama').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newKelasData = req.body
        const kelasId = parseInt(req.params.id) 


        const kelas = await editKelasById(kelasId, newKelasData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate kelas",
            data: kelas
        })
    } catch (error) {
        if (error.message === 'Kelas tidak ditemukan') {
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