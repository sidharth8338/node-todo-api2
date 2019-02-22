const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: 20
    }
})

// const newTodo = new Todo({
//     text: 'Cook Dinner',
//     completed: false,
//     completedAt: 20
// })

// newTodo.save().then((doc) => {
//     console.log('saving data', doc)
// }, (e) => {
//     console.log("unable to save data")
// })
module.exports = { Todo }