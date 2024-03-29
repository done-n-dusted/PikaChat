if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()

}
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initPassport = require('./passport-config')

const users = []
const port = 3000;

initPassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


const app = express()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
}) //home page route

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
}) //login page


app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
}) //register page

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
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

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

function checkAuthenticated(req, res, next){//middleware
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next){//middleware
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
}
app.listen(port)