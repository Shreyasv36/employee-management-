const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const con = require("../connection.js");
const bcrypt=require("bcrypt");
const multer=require("multer");
const path=require("path");

router.post('/adminlogin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({loginStatus: false, error: "Email and password are required" });
    }

    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ loginStatus: false, error: "Internal server error" });
        }

        if (result.length > 0) {
            const { email, id } = result[0];
            const token = jwt.sign(
                { role: "admin", email,id: result[0].id},
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token, { httpOnly: true });
            return res.json({ loginStatus: true });
        } else {
            return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});

router.post("/add_categary",(req,res)=>{
    const sql="INSERT INTO category (`name`) values (?)";
    con.query(sql,[req.body.category],(err,result)=>{
        if(err) return res.json({Status:false,Error:"queryerror"})
        return res.json({Status:true,Result:result})
    })
})

router.get("/add_categary", (req, res) => {
    const sql = "SELECT * FROM category"; 
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, error: "queryerror" }); 

        return res.json({ Status: true,Result: result }); 
    });
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})


router.post("/add_employee", upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee (name,email,password,salary,address,image,category) VALUES(?,?,?,?,?,?,?)`;

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return res.json({ Status: false, error: err });
        const truncatedPassword = hashedPassword.substring(0, 255);
        const values = [
            req.body.name,
            req.body.email,
            truncatedPassword,
            req.body.salary,
            req.body.address,
            req.file.filename,
            req.body.category,
        ];
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Status: false, error: err });
            return res.json({ Status: true, Result: result });
        });
    });
});
router.use(express.static('public'));
router.get("/get_employee",(req,res)=>{
        const sql="select *from employee";
        con.query(sql,(err,result)=>{
            if(err) return res.json({Status:false,Error: "Get employee error in sql"});
            return res.json({Status: "Success", Result: result})
        })
})

router.get("/edit_employee/:id",(req,res)=>{
    const id=req.params.id;
    const sql="select *from employee where id=?";
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status:false,Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee SET name=?, email=?, address=?, salary=? WHERE id=?`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.salary,
        id
    ];
    
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating employee:", err);
            return res.status(500).json({ Status: false, Error: "Error updating employee in SQL" });
        }
        console.log("Employee updated successfully");
        return res.json({ Status: "Success" });
    });
});
router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM employee WHERE id=?`;
    con.query(sql, id, (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "SQL error occurred" });
        }
        return res.json({ Status: true, Result: result });
    });
});
router.get("/admin_count",(req,res)=>{
    const sql='SELECT count(id) as admin from admin ';
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "SQL error occurred" });
        }
        return res.json({ Status: true, Result: result });
    });
})
router.get("/employee_count",(req,res)=>{
    const sql='SELECT count(id) as employee from employee';
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "SQL error occurred" });
        }
        return res.json({ Status: true, Result: result });
    });
})
router.get("/salary_count",(req,res)=>{
    const sql='SELECT sum(salary) as salary from employee';
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "SQL error occurred" });
        }
        return res.json({ Status: true, Result: result });
    });
})
router.get("/admin_select",(req,res)=>{
    const sql='SELECT * from admin';
    con.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ Status: false, Error: "SQL error occurred" });
        }
        return res.json({ Status: true, Result: result });
    });
})
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true });
});

module.exports = router;
