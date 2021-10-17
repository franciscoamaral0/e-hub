import {
  Button,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import useToasty from '../../src/contexts/Toasty'

import Link from "next/link";
import { getSession } from "next-auth/client";
import ProductsModel from "../../src/models/product";
import dbConnect from "../../src/utils/dbConnect";

import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import { formatCurrency } from "../../src/utils/currency";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  buttonAdd: {
    margin: "30px auto 50px auto",
    display: "inline-block",
  },

  gridContainer: {
    marginTop: 10,
  },
  containerButton:{
    textAlign: 'center'
  }
}));

const Dashboard = ({ products }) => {
  const classes = useStyles();
  const {setToasty} = useToasty()
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [productId, setProductId] = useState();
  const [removedProducts, setRemovedProducts] = useState([])


  const handleCloseModal = () => setOpenConfirmModal(false);

  const handleClickRemove = (productId) => {
    setProductId(productId);
    setOpenConfirmModal(true);
  };

  const handleConfirmRemove = () => {
    axios.delete("/api/products/delete", {
        data: {
          id: productId,
        },
        
      })
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleSuccess = () =>{
    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId])
    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })
  }

  const handleError = () =>{
    setOpenConfirmModal(true)
    setToasty({
      open: true,
      severity: 'error',
      text: 'Erro ao apagar anúncio, tente novamente!'
    })

  }

  return (
    <TemplateDefault>
      <Dialog open={openConfirmModal} onClose={handleCloseModal}>
        <DialogTitle>Deseja realmente apagar este anúncio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao confirmar essa operação, nao sera possível reverter
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
      {/* ------------------------ */}
      <Container maxWidth="sm" className={classes.containerButton}>
        <Typography component="h1" variant="h2" align="center">
          Meus Anuncios
        </Typography>
        <Link href={'/user/publish'} passHref> 
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonAdd}
          >
            Publicar Novo Anúncio
          </Button>
        </Link>
        
      </Container>

      <Container maxWidth="md" className={classes.gridContainer}>
        {
          products.length === 0 && 
          <Typography component='div' variant='body1' align='center' color='textPrimary' gutterBottom>
            Nenhum anúncio publicado.
          </Typography>
        }
        
        
        <Grid container spacing={4} className={classes.gridContainer}>
          {products.map((product) => { 
          if(removedProducts.includes(product._id)) return null
          return (
            <Grid key={product._id} item xs={12} sm={6} md={4}>
              <Card
                image={`/uploads/${product.files[0].name}`}
                title={product.title}
                subtitle={formatCurrency(product.price)}
                isButton={
                  <>
                    <Button size="small" color="primary">
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickRemove(product._id)}
                    >
                      Apagar
                    </Button>
                  </>
                }
              />
            </Grid>
          )})}
        </Grid>
      </Container>
    </TemplateDefault>
  );
};
Dashboard.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();

  const products = await ProductsModel.find({ "user.id": session.userId });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Dashboard;
