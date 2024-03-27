const express = require("express");
const jwt = require("jsonwebtoken");
const con = require("../connection.js");
const bcrypt = require("bcrypt");
const router = express.Router();
router.post("/employee_login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ loginStatus: false, error: "Email and password are required" });
  }
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [email], (err, result) => { 
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ loginStatus: false, error: "Internal server error" });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) return res.json({ Status: false, Error: "passworderror" });
        if (response) {
          const { email } = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email,id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token, { httpOnly: true });
          return res.json({ loginStatus: true, id: result[0].id });
        } else {
          return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
        }
      });
    } else {
      return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
    }
  });
});

router.get("/employee_deatail/:id",(req,res)=>{
  const id=req.params.id;
  const sql="select *from employee where id=?";
  con.query(sql,[id],(err,result)=>{
      if(err) return res.json({Status:false,Error: "Get employee error in sql"});
      return res.json({Status: "Success", Result: result})
  })
})
router.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.json({ Status: true });
});

module.exports = router;
