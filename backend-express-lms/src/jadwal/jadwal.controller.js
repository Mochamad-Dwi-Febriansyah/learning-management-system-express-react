const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllJadwal, getJadwalKelasById,createJadwal } = require( "./jadwal.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/', async (req,res) => {
    try {
        const kelasMataPelajaran = await getAllJadwal() 
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

router.get('/:kelasid', async (req,res) => {
    try {
        const kelasId = parseInt(req.params.kelasid)
        const jadwal = await getJadwalKelasById(kelasId)
        if (!jadwal) {
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
            data: jadwal
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

router.post('/', roleCheck(['ADMIN']),[ 
        body('kelas_id').notEmpty(),
        body('mata_pelajaran_id').notEmpty(),
        body('minggu_id').notEmpty(), 
        body('waktu_mulai').notEmpty(),
        body('waktu_selesai').notEmpty(),
        body('ruang').notEmpty() 
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newJadwalData = req.body 

        const jadwal = await createJadwal(newJadwalData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat jadwal mata pelajaran",
            data: jadwal
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



module.exports =  router