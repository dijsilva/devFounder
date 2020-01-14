const Dev = require('../Models/dev')
const axios = require('axios')
const parseStringASVector = require('../utils/parseStringAsVector')

module.exports = {
    async index(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res){
        const { github_user, techs, latitude, longitude } = req.body
        
        let dev = await Dev.findOne({ github_user })

        if (!dev){

            const response = await axios.get(`https://api.github.com/users/${github_user}`)
    
            // name = login: tries find a field name in response, but if not found, the name will be signed with login value
            const {name = login, avatar_url, bio = 'Not found'} = response.data
    
            const techsVector = parseStringASVector(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_user, 
                name,
                avatar_url,
                bio,
                techs: techsVector,
                location
            })
        }

        return res.json(dev)
    }
}