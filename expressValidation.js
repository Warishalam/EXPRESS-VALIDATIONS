const express = require('express');

const app = express();
app.use(express.json());

app.use(validator);
app.get('/', home);
app.get('/users', getUsers);
app.post('/register', registerUser);

function validator (req, res, next){
    const body = req.body;
    if(!body.first_name){
        return res.status(400).send("First name is required");
    }
    if(!body.last_name){
        return res.status(400).send("Last name is required");
    }
    if(!body.email.includes('@') || !body.email.includes('.') || !body.email.includes('com')){
        return res.status(400).send("Invalid email");
    }
    if(body.pincode.length !== 6){
        return res.status(400).send("Invalid pincode");
    }
    if(!(body.age > 0 && body.age < 100)){
        return res.status(400).send("Invalid age, age must be between 1 and 100");
    }
    if(!(body.gender === "Male" || body.gender === "Female" || body.gender === "Others")){
        return res.status(400).send("Invalid gender, gender must be Male/Female/Others");
    }
    next();
}

function home(req, res) {
    res.status(200).send("Hello World");
}

function getUsers (req, res) {
    res.status(200).send(users);
}

function registerUser (req, res) {
    users.push(req.body);
    res.status(200).send("User registration Success.")
};

app.listen(5000, (req, res)=>{
    try{
       console.log("Server is started at port number 5000")
    }catch(err){
        req.send(err);
    }
})