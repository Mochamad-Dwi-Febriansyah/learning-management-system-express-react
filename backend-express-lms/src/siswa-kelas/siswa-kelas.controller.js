const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllSiswaKelas, getSiswaKelasById,createSiswaKelas, deleteSiswaKelasById, editSiswaKelasById } = require( "./siswa-kelas.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/', roleCheck(['ADMIN']), async (req,res) => {
    try {
        const siswaKelas = await getAllSiswaKelas() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat siswa kelas',
            data: siswaKelas
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
        const siswaKelasId = parseInt(req.params.id)
        const siswaKelas = await getSiswaKelasById(siswaKelasId)
        if (!siswaKelas) {
            return res.status(404).json({
              status: "error",
              code: 404,
              message: 'Siswa kelas tidak ditemukan',
            });
          } 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat siswa kelas',
            data: siswaKelas
        })
    } catch (error) {
        if (error.message === 'Siswa kelas tidak ditemukan') {
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
        body('siswa_id').notEmpty(),
        body('kelas_id').notEmpty()
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newSiswaKelasData = req.body 

        const siswaKelas = await createSiswaKelas(newSiswaKelasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat siswa kelas",
            data: siswaKelas
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
        const siswaKelasId = parseInt(req.params.id) 
        await deleteSiswaKelasById(siswaKelasId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus siswa kelas"
        })
    } catch (error) {
        if (error.message === 'Siswa kelas tidak ditemukan') {
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
    body('siswa_id').notEmpty(),
    body('kelas_id').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newSiswaKelasData = req.body
        const siswaKelasId = parseInt(req.params.id) 


        const siswaKelas = await editSiswaKelasById(siswaKelasId, newSiswaKelasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate siswa kelas",
            data: siswaKelas
        })
    } catch (error) {
        if (error.message === 'Siswa kelas tidak ditemukan') {
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