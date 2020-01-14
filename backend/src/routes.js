const { Router } = require('express')
const DevController = require('./Controllers/DevController')
const SearchController = require('./Controllers/SearchControler')

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/storeDevs', DevController.store)

routes.get('/search', SearchController.index)

module.exports = routes;