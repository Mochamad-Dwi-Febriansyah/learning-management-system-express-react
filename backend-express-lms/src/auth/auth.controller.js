const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");
const  getUserByEmail  = require("./auth.service.js");
const { accessValidation, tokenBlacklist } = require("../../middleware/authCheck.js");


const router = express.Router()

dotenv.config()

router.post('/login',[ 
    body('email').isEmail().notEmpty(),
    body('password').notEmpty(), 
] , async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        const user = await getUserByEmail(email)

        if(!user){
            return res.status(404).json({
                status: "error",
                code: 404,
                message: 'Email tidak ditemukan'
            })
        } 
    try {
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(isPasswordValid){
            const payload = {
                id: user.id,
                nama: user.nama,
                email: user.email,
                user_type: user.user_type
            }

            const secret = process.env.JWT_SECRET

            const expiresIn = 60 * 60 * 1

            const token = jwt.sign(payload, secret, { expiresIn: expiresIn })
 

            // res.cookie('token', token, {
            //     httpOnly: true, // Tidak bisa diakses dari JavaScript
            //     secure: process.env.NODE_ENV === 'production', // Hanya untuk HTTPS di produksi
            //     sameSite: 'Strict', // Untuk mencegah pengiriman token di antara situs
            //     maxAge: 3600000 // 1 jam
            // });

            return res.status(200).json({
                status: "success",
                code: 200,
                message: 'Berhasil login',
                data: {
                    token: token,
                    user: payload
                }
            })
        }else{
            return res.status(401).json({
                status: 401,
                message: 'Email atau password salah',
              });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
})

router.post('/logout', accessValidation, (req, res) => { 
    try {    
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
    
        // Tambahkan token ke blacklist
        tokenBlacklist.push(token);
    
        res.status(200).json({
            status: "success",
            code: 200,
            message: 'Logout berhasil',
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: 'Internal server error',
            error: error.message
        })
    }
  });

module.exports =  router