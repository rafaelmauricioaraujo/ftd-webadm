const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const ObjectId = require('mongodb').ObjectId;

module.exports = function(passport){

    function findUser(username, callback){
        global.conn.collection(process.env.UCOLL).findOne({'username':username}, function(err, doc){
            callback(err, doc);
        });
    }

    function findUserById(id, callback){
        global.conn.collection(process.env.UCOLL).findOne({_id: ObjectId(id)}, function(err, doc){
            callback(err, doc);
        });
    }

    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        findUserById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },function(username, password, done) {
        findUser(username, function(err, user){
            if(err) {
                return done(err);
            }

            if (!user){
                return done(null, false);
            }

            bcrypt.compare(password, user.password, function(err, isValid){
                if(err){
                    return done(err);
                }

                if(!isValid){
                    return done(null, false);
                }

                return done(null, user);
            });
        });
    }
    ));
}