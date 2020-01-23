const Dev = require('../Models/dev')
const parseStringAsVector = require('../utils/parseStringAsVector')

module.exports = {
    async index(req, res){
        const { latitude, longitude, techs} = req.query

        const techsVector = parseStringAsVector(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsVector,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 30000,
                }
            }
        })
        return res.json(devs)
    }
}