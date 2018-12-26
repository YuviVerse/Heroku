const mongoose = require('mongoose')

const schema = new mongoose.Schema ({
    id: {type: Number, required: true,index: 1},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    age: {type: Number, required: true},
    height: Number,     
    weight: Number,   
    compe:[{
        name:   String, 
        year:   Number,
        score:  Number
    }],
})

const competitor_schema = mongoose.Schema(schema)
const competitor = mongoose.model('competitors', competitor_schema)

module.exports = competitor