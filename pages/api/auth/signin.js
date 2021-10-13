import {post} from '../../../src/controllers/auth/signin'
import nextConnect from "next-connect"


const route = nextConnect()



route.post(post)

export default route