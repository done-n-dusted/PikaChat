const { authenticate } = require('passport')
const bcrypt = require('bcrypt')


const LocalStrategy = require('passport-local').Strategy


function initialize(passport, getUserByEmail, getUserById){
    // console.log('In initialize');
    const authenticateUser = async (email, password, done) =>  {
        const user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {message: "no user with that email"});
        }
        
        try{
            if(await bcrypt.compare(password, user.password)){
                // return done(user, true, {message: "authentication succesful"});
                return done(null, user);
            }
            else{
                return done(null, false, {message: "password incorrect"});

            }
        }
        catch(err){
            done(err);
        }
    };


    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id));
    })
}

module.exports = initialize;