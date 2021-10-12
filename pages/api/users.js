import {get, post} from '../../src/controllers/users'
import nextConnect from "next-connect"


const route = nextConnect()


route.get(get)
route.post(post)

export default route