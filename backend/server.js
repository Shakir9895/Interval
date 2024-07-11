const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const router = require('./Routers/index')
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require('path');
const db = require("./Utils");
app.use('/images',express.static(path.join(__dirname,'public/images')));
app.use(cors())






//mySql connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'kallungal',
//     database: 'db3',
// })



 db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log("Connected successfully to MySQL");
    }
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  heading VARCHAR(50) NOT NULL,
  discription VARCHAR(200) NOT NULL,
  image VARCHAR(255) NOT NULL,
  priority VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


db.query(createTableQuery, (err, results, fields) => {
    if (err) {
        console.error('Error creating table:', err.stack);
    } else {
        console.log('Table users created successfully');
    }
});



// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null,req.body.imgName);
    }
})

const upload = multer({storage:storage});



//createAPI
app.post('/uploadimg',upload.single('file'),(req,res)=>{
    // const image = req.file.filename;
    res.status(200).json("IMG upload success fullyy!!!!")
})

app.use(router)





app.listen(5001, () => {
    console.log("SERVER IS RUNNING>>>>", 5000)
})