const express = require( "express" )
const { body, validationResult  } = require( "express-validator")
const { getAllPengumpulanTugas, getPengumpulanTugasById,createPengumpulanTugas, deletePengumpulanTugasById, editPengumpulanTugasById,getPengumpulanTugasByTugId ,getPengumpulanTugasByTugSisId } = require( "./pengumpulan-tugas.service.js")
const roleCheck = require("../../middleware/roleCheck.js");

const router = express.Router()

router.get('/',roleCheck(['SISWA']), async (req,res) => {
    try {
        const pengumpulanTugas = await getAllPengumpulanTugas() 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat pengumpulan Tugas',
            data: pengumpulanTugas
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

router.get('/:id',roleCheck(['SISWA']), async (req,res) => {
    try {
        const pengumpulanTugasId = parseInt(req.params.id)
        const pengumpulanTugas = await getPengumpulanTugasById(pengumpulanTugasId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat pengumpulan Tugas',
            data: pengumpulanTugas
        })
    } catch (error) {
        if (error.message === 'Pengumpulan tugas tidak ditemukan') {
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

router.post('/', roleCheck(['SISWA']),[ 
        body('tugas_id').notEmpty(),
        body('siswa_id').notEmpty(), 
        body('deskripsi_pengumpulan_tugas'),
        body('dokumen_pengumpulan_tugas'),
        body('pengumpulan_telat'),
        body('nilai'),
        body('catatan')
    ] ,async (req,res) => {   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const newPengumpulanTugasData = req.body 

        const pengumpulanTugas = await createPengumpulanTugas(newPengumpulanTugasData)

        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil membuat pengumpulan tugas",
            data: pengumpulanTugas
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

router.delete('/:id',roleCheck(['SISWA']), async (req,res) => {
    try {
        const pengumpulanTugasId = parseInt(req.params.id) 
        await deletePengumpulanTugasById(pengumpulanTugasId)
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil menghapus pengumpulan tugas"
        })
    } catch (error) {
        if (error.message === 'Pengumpulan tugas tidak ditemukan') {
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

router.put('/:id',roleCheck(['SISWA']), [ 
    body('tugas_id').notEmpty(),
    body('siswa_id').notEmpty(), 
    body('deskripsi_pengumpulan_tugas'),
    body('dokumen_pengumpulan_tugas'),
    body('pengumpulan_telat'),
    body('nilai'),
    body('catatan')
    ], async (req,res) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const newPengumpulanTugasData = req.body
        const pengumpulanTugasId = parseInt(req.params.id) 


        const pengumpulanTugas = await editPengumpulanTugasById(pengumpulanTugasId, newPengumpulanTugasData)
        res.status(201).json({
            status: "success",
            code: 201,
            message: "Berhasil mengupdate pengumpulan tugas",
            data: pengumpulanTugas
        })
    } catch (error) {
        if (error.message === 'Pengumpulan tugas tidak ditemukan') {
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

router.get('/tugas/:tugasid', roleCheck(['GURU']), async (req,res) => {
    try {
        const tugasId = parseInt(req.params.tugasid) 
        const pengumpulanTugas = await getPengumpulanTugasByTugId(tugasId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat pengumpulan tugas',
            data: pengumpulanTugas
        })
    } catch (error) {
        if (error.message === 'Pengumpulan tugas tidak ditemukan') {
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

router.get('/tugas/:tugasid/siswa/:siswaid', roleCheck(['SISWA']), async (req,res) => {
    try {
        const tugasId = parseInt(req.params.tugasid)
        const siswaId = parseInt(req.params.siswaid) 
        const pengumpulanTugas = await getPengumpulanTugasByTugSisId(tugasId, siswaId) 
        res.status(200).json({ 
            status: "success",
            code: 200,
            message: 'Berhasil memuat pengumpulan tugas',
            data: pengumpulanTugas
        })
    } catch (error) {
        if (error.message === 'Pengumpulan tugas tidak ditemukan') {
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