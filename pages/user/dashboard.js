import { Button, Container, Typography, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'


import { getSession } from 'next-auth/client'
import ProductsModel from '../../src/models/product'
import dbConnect from '../../src/utils/dbConnect'

import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'
import { formatCurrency } from '../../src/utils/currency'



const useStyles = makeStyles((theme) =>({
  
  buttonAdd: {
    margin: '30px auto',
    display: 'block',

  },

  gridContainer:{
    marginTop: 10
  }

}))

const Dashboard = ({products}) => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth='sm' >
        <Typography component='h1' variant='h2' align='center' >
          Meus Anuncios
        </Typography>
          <Button variant='contained' color='primary' className={classes.buttonAdd}>
            Publicar Novo Anúncio 
          </Button>
      </Container>

      <Container maxWidth='md' className={classes.gridContainer} >
        <Grid container spacing={4} className={classes.gridContainer}>
          {
            products.map((product) =>(
              <Grid key={product._id}item xs={12} sm={6} md={4}>
                <Card
                image={`/uploads/${product.files[0].name}`}
                title={product.title}
                subtitle={formatCurrency(product.price)}
                isButton={
                  <>
                    <Button size='small' color='primary'>Editar</Button>
                    <Button size='small' color='primary'>Apagar</Button>
                  </>  
                }
                />
              </Grid>
            ))
          }
          
          


          
        </Grid>
      </Container>
    </TemplateDefault>
  )

}
Dashboard.requireAuth = true

export async function getServerSideProps({ req}) {
  const session = await getSession({req})
  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': session.userId})

  return{
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Dashboard