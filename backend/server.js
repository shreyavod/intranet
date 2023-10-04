import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
//import multer from 'multer'


import db from './config/connectiondb.js'

//importing routes
import authRoute from './routes/auth.js'
import comMangementRoute from './routes/companymanagement.js'
// import attendanceRoute from './routes/attendance.js'
import userManagementRoute from './routes/usermanagement.js'


// const express = require('express')
// const cors = require('cors')
// const mysql = require('mysql2')
// const cookieParser = require('cookie-parser')
// const jwt = require('jsonwebtoken')
//import cors from 'cors'

// const db = mysql.createConnection({
//     host:'192.168.30.75',
//     user:'user',
//     password:'pass',
//     database:'ecart'   
// })

// const db= mysql.createConnection({
//     user:'root',
//     password:'root',
//     database:'ecart'
// })

// db.connect((err)=>{
//     if (err){
//         console.log(err)
//     }
//     else {
//         console.log('connected')
//     }
// })

db.connect((err)=>{
    if (err){
        console.log(err)
    }
    else {
        console.log('connected')
    }
})

const app = express()

//middleware 
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('uploads'));

app.use('/api/',authRoute)
app.use('/api/',comMangementRoute)
// app.use('/api/',attendanceRoute)
app.use('/api/',userManagementRoute)


// app.get('/',(req,res)=>{
//     console.log(req.session)
//     res.send('I am from the backend')
// })

// app.get('/products',(req,res)=>{

//     const q = `select * from products`
//     db.query(q,(err,result)=>{
//         if (err) throw err
//         //console.log(result)
//         res.status(201).json(result)
//     })
    
// })

// app.post('/login', (req,res)=>{
//     const values= [req.body.username, req.body.password]
//     console.log(values)
//     const q = `select * from users where username=? and password=?`
//     db.query(q,values,(err,result)=>{
//         if (err) throw err
//         console.log(result[0].id)
//         if (result.length === 0){
//             res.status(500).json('invalid user')
//         }
//         else{
            
//             //res.status(200).json('login successfull')
//             const token = jwt.sign({id:result[0].id}, 'bcg')
//             console.log(token)
//             res.cookie('user',token,{httpOnly:true}).status(200).json('login succefull')
//         }
//     })
    
// })

// app.get('/jwt',(req,res)=>{
//     const token = jwt.sign({id:1}, 'bcg')
//     console.log(token)
//     res.cookie(token).status(200).json('cookie w')
// })

// app.post('/verifyjwt',(req,res)=>{
//     const token = req.body.token
//     console.log(req.cookies)
//     console.log('token:',token)
//     jwt.verify(req.cookies.user,'bcg',(err,result)=>{
//         if (err) throw err
//         res.send(result)
//     })
// })

// app.get('/logout', (req,res)=>{
//     console.log(req.cookies.user)
//     res.clearCookie('user',{
//         secure:true,
//         sameSite:"none"
//     }).status(200).json('logged out')
    
// })



// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//         console.log(file)
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({ storage });
  
//   app.use(express.static('uploads'));
  
//   app.post('/api/upload', upload.array('file'), (req, res) => {
//     console.log('body', req.body)
    
//     console.log('up',upload)
//     console.log('Files uploaded successfully');
//     // console.log(req.files);
//     res.send('Files uploaded successfully');
//   });




app.listen(8080,()=>{
    console.log('Hii server is running at: http://localhost:8080/')
})