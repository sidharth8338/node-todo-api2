const mongoose = require('mongoose')
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        default: "Anonymous"
    },
    email: {
        type: String,
        minlength: 1,
        required: true
    }
})

// const newUser = new Users({
//     name: "sidahrth",
//     email: "sidharth8338@gmail.com"
// })

// newUser.save().then((doc) => {
//     console.log('saving data', doc)
// }, (e) => {
//     console.log('Unable to save data')
// })
module.exports = {
    Users
}