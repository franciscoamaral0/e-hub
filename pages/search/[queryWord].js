import Link from "next/link";
import {

  Box,
  Container,
  IconButton,
  InputBase,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import slugify from 'slugify'
import SerchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";

import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import { formatCurrency } from "../../src/utils/currency";
import ProductsModel from '../../src/models/product'


const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(0, 2),
    marginTop: 5,
  },
  boxContainer: {
    paddingBottom: theme.spacing(3),
    marginTop: 20,
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
  linkTextDecoration:{
    textDecoration: 'none'
  }
}));

const List = ({products, searchQuery}) => {
  const classes = useStyles();
  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Paper className={classes.searchBox}>
          <InputBase fullWidth placeholder="Ex.: Iphone 12 com garantia" />
          <IconButton>
            <SerchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth="md" className={classes.boxContainer}>
        <Box className={classes.box}>
          <Typography component="h6" variant="h6" color="textPrimary">
            Anúncios
          </Typography>
          <Typography component="div" variant="body2" color="textPrimary">
            ENCONTRADOS {products.length} ANÚNCIOS PARA O TERMO {`"${searchQuery.toUpperCase()}"`}
          </Typography>

          <Grid container spacing={4} className={classes.gridContainer}>
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
        </Box>
      </Container>
    </TemplateDefault>
  );
};

export async function getServerSideProps({query}) {
  const {queryWord} =  query

  const products = await ProductsModel.find({
    $or: [
      {
        title: {
          $regex: queryWord, 
          $options: 'i'
        }
      },
      {
        description:{
          $regex: queryWord, 
          $options: 'i'
        }
      }
    ]
  })


  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      searchQuery : JSON.parse(JSON.stringify(queryWord))
    }
  }
}
export default List;
