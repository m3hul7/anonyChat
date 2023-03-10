const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    first_name : {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    admin: {
        type: Boolean
    },
    timezone: {
        type: String
    },
    country: {
        type: String
    },
    language: {
        type: String
    },
    chats: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref:'Chat'
        }]
    },
    password: {
        type: String,
        required: [true, 'Please provide password!'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide password confirm!'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: "password mismatched"
        }
    },
    passwordChangedAt: Date
})

userSchema.methods.correctPassword = async (candidPassword, userpassword) => {
    return await bcrypt.compare(candidPassword, userpassword)
}

userSchema.pre('save', function (next) {
    if(this.isNew) {
        this.passwordChangedAt = Date.now()
    }
    next()
})

userSchema.pre('save',async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User