import { Container, IconButton, InputBase, Typography, Paper, Grid} from '@material-ui/core'
import SerchIcon from '@material-ui/icons/Search'
import Link from 'next/link'
import slugify from 'slugify'

import { makeStyles } from '@material-ui/core'
import TemplateDefault from '../src/templates/Default'
import Card from '../src/components/Card'
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/product'
import { formatCurrency } from '../src/utils/currency'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'


const useStyles = makeStyles((theme) => ({
  
  searchBox:{
    display:'flex',
    justifyContent:'center',
    padding: theme.spacing(0,2),
    marginTop: 20
  },
  cardGrid:{
    marginTop: 50

  },
  linkTextDecoration:{
    textDecoration: 'none !important'
  }
}))

const Home =({products}) =>{
  const router = useRouter()
  const classes = useStyles()
  const [search, setSearch] = useState()

  const handleSubmitSearch =() =>{
    router.push({
      pathname: `/search/${search}`
    })
  }


  return(
    <TemplateDefault>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h3' align='center' color='textPrimary'>
          O que deseja encontrar?
        </Typography>
        <Paper className={classes.searchBox}>
          <InputBase
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          placeholder='Ex.: Iphone 12 com garantia'/>
          <IconButton onClick={handleSubmitSearch}>
            <SerchIcon/>
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth='md' className={classes.cardGrid}>
        <Typography component='h2' variant='h4' align='center' color='textPrimary'>
          Destaques
        </Typography>
        <br/>
        <Grid container spacing={4}>
        {
          products.map(product =>{
            const category = slugify(product.category).toLowerCase()
            const title = slugify(product.title).toLowerCase()

            return(
              <Grid key={product._id} item xs={12} sm={6} md={4}>
              <Link href={`/${category}/${title}/${product._id}`} passHref>
                <a className={classes.linkTextDecoration}>
                  <Card
                      image={`/uploads/${product.files[0].name}`}
                      title={product.title}
                      subtitle={formatCurrency(product.price)}
                      />
                  </a>
                </Link>
              </Grid>
            )
          })
        }
        
          
        </Grid>
      </Container>

    </TemplateDefault>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const products = await ProductsModel.aggregate([{
    $sample: { size: 6 }
  }])

  return {
    props:{
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home