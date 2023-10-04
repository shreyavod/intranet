import expres from 'express'
import { viewusers, adduser, editusers, resignusers } from '../controllers/usermanagement.js'

const route = expres.Router()

// route.post('/addcompany',addcompany)
route.get('/viewusers',viewusers)
route.post('/adduser',adduser)
route.put('/editusers/:id',editusers)
route.post('/resignusers',resignusers)
// route.post('/deletecompany',deletecompany)



export default route