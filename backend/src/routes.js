const { Router } = require('express')
const DevController = require('./Controllers/DevController')
const SearchController = require('./Controllers/SearchControler')

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/storeDevs', DevController.store)
routes.post('/updateDev', DevController.update)
routes.delete('/deleteDev', DevController.destroy)

// search user based in distance of a point
routes.get('/search', SearchController.index)

module.exports = routes;