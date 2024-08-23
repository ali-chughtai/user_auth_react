var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const salt = 10;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Simple regex for email validation
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew){
        bcrypt.hash(this.password, salt , (err,hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    }
    else{
        return next();
    }
}
);

module.exports = mongoose.model('User', userSchema);
