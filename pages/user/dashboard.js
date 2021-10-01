import { Button, Container, Typography, Grid, CardMedia, CardContent, Card, CardActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import TemplateDefault from '../../src/templates/Default'


const useStyles = makeStyles((theme) =>({
  container:{
    padding: theme.spacing(8,0,6)
  },
  sizeImage:{
    paddingTop:'56%'
  },
  buttonAdd: {
    margin: '30px auto',
    display: 'block',

  },

}))

const Dashboard = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth='sm' className={classes.container}>
        <Typography component='h1' variant='h2' align='center' >
          Meus Anuncios
        </Typography>
          <Button variant='contained' color='primary' className={classes.buttonAdd}>
            Publicar Novo Anúncio 
          </Button>
      </Container>

      <Container maxWidth='md' >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image={'https://source.unsplash.com/random'}
                title='titulo imagem'
                className={classes.sizeImage}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto x
                </Typography>
                <Typography>
                  €50,99
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Editar</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image={'https://source.unsplash.com/random'}
                title='titulo imagem'
                className={classes.sizeImage}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto x
                </Typography>
                <Typography>
                  €50,99
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Editar</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image={'https://source.unsplash.com/random'}
                title='titulo imagem'
                className={classes.sizeImage}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto x
                </Typography>
                <Typography>
                  €50,99
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Editar</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image={'https://source.unsplash.com/random'}
                title='titulo imagem'
                className={classes.sizeImage}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto x
                </Typography>
                <Typography>
                  €50,99
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Editar</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image={'https://source.unsplash.com/random'}
                title='titulo imagem'
                className={classes.sizeImage}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto x
                </Typography>
                <Typography>
                  €50,99
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Editar</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image={'https://source.unsplash.com/random'}
                title='titulo imagem'
                className={classes.sizeImage}
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto x
                </Typography>
                <Typography>
                  €50,99
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Editar</Button>
              </CardActions>
            </Card>
          </Grid>


          
        </Grid>
      </Container>
    </TemplateDefault>
  )

}

export default Dashboard