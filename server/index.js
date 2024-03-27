const express = require('express');
const app = express();
const con = require('./connection'); 
const cors = require('cors');
const adminroute = require('./routes/adminroute');
const employeeroute = require('./routes/employee');
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));
app.use(cookieParser());
app.use(express.static('public'));

app.use(express.json());

app.use("/auth", adminroute);
app.use("/employee", employeeroute);

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
})
app.listen(3000, () => {
    console.log("Listening on port 3000");
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to database!");
    });
});
