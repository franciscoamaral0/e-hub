import {remove} from '../../../src/controllers/products'
import nextConnect from "next-connect"


const route = nextConnect()


route.delete(remove)

export default route
