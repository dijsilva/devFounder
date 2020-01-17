const Dev = require('../Models/dev')
const axios = require('axios')
const parseStringASVector = require('../utils/parseStringAsVector')
const bcrypt = require('bcrypt')

module.exports = {
    async index(req, res){
        const devs = await Dev.find().select('-codeForIdConfirmation')
        return res.json(devs)
    },

    async store(req, res){
        const { github_user, techs, latitude, longitude, codeForIdConfirmation, codeForIdConfirmation_confirm } = req.body
        
        let dev = await Dev.findOne({ github_user }).select('-codeForIdConfirmation')

        if (!dev){

            const response = await axios.get(`https://api.github.com/users/${github_user}`)
    
            // name = login: tries find a field name in response, but if not found, the name will be signed with login value
            const {name = login, avatar_url, bio = 'Not found'} = response.data
    
            const techsVector = parseStringASVector(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            
            if (!codeForIdConfirmation){
                return res.status(400).json({error: 'The code for id confirmation need be defined '})
            }
            
            if (codeForIdConfirmation != codeForIdConfirmation_confirm){
                return res.status(400).json({error: 'The code for id confirmation and code confirm need be equals.'})
            }

            const codeForIdConfirmationHash = await bcrypt.hash(codeForIdConfirmation, 10)

            dev = await Dev.create({
                github_user, 
                name,
                avatar_url,
                bio,
                techs: techsVector,
                location,
                codeForIdConfirmation: codeForIdConfirmationHash
            })
        }

        dev.codeForIdConfirmation = undefined

        return res.json(dev)
    },

    async update(req, res){

        const { github_user, techs, longitude, latitude, codeForIdConfirmation, name, bio } = req.body
        const dev = await Dev.findOne({ github_user })
        
        if (!dev){
            return res.json({error: 'User not found'})
        }
        
        const codeForIdConfirmationHash = await bcrypt.compare(codeForIdConfirmation, dev.codeForIdConfirmation)
        
        if (!codeForIdConfirmationHash){
            return res.status(400).json({error: 'The codefor id confirmation is incorrect'})
        }
        
        const techsVector = parseStringASVector(techs)
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        
        const updateDev = await Dev.findOneAndUpdate( {github_user} , {
            techs: techsVector,
            location,
            bio,
            name
        }, {
            returnOriginal: false
        })

        console.log(updateDev)

        updateDev.codeForIdConfirmation = undefined

        return res.json(updateDev)
    },

    async destroy(req, res){
        const { github_user, codeForIdConfirmation } = req.body

        const dev = await Dev.findOne({github_user})

        if (!dev){
            return res.status(400).json({error: 'User not found'})
        }

        const codeForIdConfirmationHash = await bcrypt.compare(codeForIdConfirmation, dev.codeForIdConfirmation)
        
        if (!codeForIdConfirmationHash){
            return res.status(400).json({error: 'The codefor id confirmation is incorrect'})
        }

        await Dev.findOneAndDelete({github_user})

        return res.json({message: 'Dev success deleted.'})
    }
}