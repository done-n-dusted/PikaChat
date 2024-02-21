const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const initPassport = require('./passport-config')
const port = 3000;

initPassport(passport);
const users = []

const app = express()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Random Name"})
}) //home page route

app.get('/login', (req, res) => {
    res.render('login.ejs')

}) //login page


app.get('/register', (req, res) => {
    res.render('register.ejs')
}) //register page

app.post('/login', (req, res) => {

})

app.post('/register', async (req, res) => {
    try{
        const hashedPwd = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd
        })
        res.redirect('/login')
    }catch(err){
        res.redirect('/register')
    }
    console.log(users)
})

app.listen(port)