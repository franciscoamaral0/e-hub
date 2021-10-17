import { post} from '../../../src/controllers/products'
import nextConnect from "next-connect"


const route = nextConnect()

route.post(post)

export default route

export const config ={
  api: {
    bodyParser: false
  }
}