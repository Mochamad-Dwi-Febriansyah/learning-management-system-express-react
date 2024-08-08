const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllMataPelajaran, getMataPelajaranById,createMataPelajaran, deleteMataPelajaranById, editMataPelajaranById } = require( "./mata-pelajaran.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/',roleCheck(['ADMIN']), async (req,res) => {
    try {
        const mataPelajaran = await getAllMataPelajaran() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat mata pelajaran',
            data: mataPelajaran
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
        const mataPelajaranId = parseInt(req.params.id)
        const mataPelajaran = await getMataPelajaranById(mataPelajaranId)
        if (!mataPelajaran) {
            return res.status(404).json({
              status: "error",
              code: 404,
              message: 'Mata pelajaran tidak ditemukan',
            });
          } 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat mata pelajaran',
            data: mataPelajaran
        })
    } catch (error) {
        if (error.message === 'Mata pelajaran tidak ditemukan') {
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
        body('nama').notEmpty(),
        body('created_by_id').notEmpty() 
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newMataPelajaranData = req.body 

        const mataPelajaran = await createMataPelajaran(newMataPelajaranData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat mata pelajaran",
            data: mataPelajaran
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
        const mataPelajaranId = parseInt(req.params.id) 
        await deleteMataPelajaranById(mataPelajaranId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus mata pelajaran"
        })
    } catch (error) {
        if (error.message === 'Mata pelajaran tidak ditemukan') {
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
        body('nama').notEmpty(),
        body('created_by_id').notEmpty()
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newMataPelajaranData = req.body
        const mataPelajaranId = parseInt(req.params.id) 


        const mataPelajaran = await editMataPelajaranById(mataPelajaranId, newMataPelajaranData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate mata pelajaran",
            data: mataPelajaran
        })
    } catch (error) {
        if (error.message === 'Mata pelajaran tidak ditemukan') {
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