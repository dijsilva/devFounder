const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')


// create a new model for create a new users and store at database
const DevSchema = new mongoose.Schema({
    //typing the fields of schema
    name: String,
    github_user: String,
    bio: String,
    avatar_url: String,
    // this syntax is sufficient so that this field can receive a string vector
    techs: [String],
    location: {
        //was created a schema for receive the coordinates values
        type: PointSchema,
        //when work with coordinate values is necessary create a index. In this cases, the index = 2dsphere.
        index: '2dsphere'
    }
})


//export this model. The syntax is: mongoose.model(nameOfModel, nameOfDeclaredObject)
module.exports = mongoose.model('Dev', DevSchema)