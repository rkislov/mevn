const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')


const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

UserSchema.pre('save', function (next){
    const user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err,salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null , function (err, hash) {
                if (err) {
                    return next (err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next();
    }

})
UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isNatch) {
        if (err) {
            return callback (err)
        }
        callback(null, isMatch)
    })
}

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel