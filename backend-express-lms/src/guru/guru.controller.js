const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllGuru, getGuruById,createGuru, deleteGuruById, editGuruById, isNisUnique, isEmailUnique } = require( "./guru.service.js")
const roleCheck = require("../../middleware/roleCheck.js"); 

const router = express.Router()

router.get('/', roleCheck(['ADMIN']), async (req,res) => {
    try {
        const guru = await getAllGuru() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat guru',
            data: guru
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
        const guruId = parseInt(req.params.id)
        const guru = await getGuruById(guruId)
        if (!guru) {
            return res.status(404).json({
              status: "error",
              code: 404,
              message: 'Guru tidak ditemukan',
            });
          } 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat guru',
            data: guru
        })
    } catch (error) {
        if (error.message === 'Guru tidak ditemukan') {
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
        body('nis').isInt().notEmpty().custom(isNisUnique),
        body('nama').notEmpty(),
        body('email').isEmail().notEmpty().custom(isEmailUnique),
        body('password').isLength({ min: 6 }).notEmpty(),
        body('jenis_kelamin').isIn(['LAKI', 'PEREMPUAN']).notEmpty(),
        body('agama').isIn(['ISLAM', 'KRISTEN', 'KATHOLIK', 'HINDU', 'BUDHA', 'KONGHUCU']).notEmpty(),
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newGuruData = req.body 

        const guru = await createGuru(newGuruData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat guru",
            data: guru
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
        const guruId = parseInt(req.params.id) 
        await deleteGuruById(guruId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus guru"
        })
    } catch (error) {
        if (error.message === 'Guru tidak ditemukan') {
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
        body('nis').isInt().notEmpty(),
        body('nama').notEmpty(),
        body('email').isEmail().notEmpty(),
        body('password').isLength({ min: 6 }).notEmpty(),
        body('jenis_kelamin').isIn(['LAKI', 'PEREMPUAN']).notEmpty(),
        body('agama').isIn(['ISLAM', 'KRISTEN', 'KATHOLIK', 'HINDU', 'BUDHA', 'KONGHUCU']).notEmpty(),
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newGuruData = req.body
        const guruId = parseInt(req.params.id) 


        const guru = await editGuruById(guruId, newGuruData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate guru",
            data: guru
        })
    } catch (error) {
        if (error.message === 'Guru tidak ditemukan') {
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