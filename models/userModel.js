const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema= mongoose.Schema

const userSchema = new Schema({
    email : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    //Validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Passwrd is not strong enough')
    }


    const exist = await this.findOne({email})

    if(exist){
        throw Error('Email is already in use')
    }
    //my password
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
            // Store hash in your password DB.
           const user = await this.create({email, password : hashedPassword})
           return user
        
}


//static login method
userSchema.statics.login = async function (email, password) {
       //Validation
       if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    } 
    
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Invalid login credential')
    }
    return user
    
}

module.exports  = mongoose.model('workoutUser', userSchema)