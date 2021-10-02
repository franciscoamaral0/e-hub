import { Container, IconButton, InputBase, Typography, Paper, Grid, Card, CardMedia, CardContent } from '@material-ui/core'
import SerchIcon from '@material-ui/icons/Search'

import { makeStyles } from '@material-ui/core'
import TemplateDefault from '../src/templates/Default'

const useStyles = makeStyles((theme) => ({
  
  searchBox:{
    display:'flex',
    justifyContent:'center',
    padding: theme.spacing(0,2),
    marginTop: 20
  },
  sizeImage:{
    paddingTop:'56%'
  },


}))

const Home =() =>{
  const classes = useStyles()


  return(
    <TemplateDefault>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h3' align='center' color='textPrimary'>
          O que deseja encontrar?
        </Typography>
        <Paper className={classes.searchBox}>
          <InputBase fullWidth placeholder='Ex.: Iphone 12 com garantia'/>
          <IconButton>
            <SerchIcon/>
          </IconButton>
        </Paper>
      </Container>

      <Container maxWidth='lg' className={classes.cardGrid}>
        <Typography component='h2' variant='h4' align='center' color='textPrimary'>
          Destaques
        </Typography>
        <br/>
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
            </Card>
          </Grid>
        </Grid>
      </Container>

    </TemplateDefault>
  )
}

export default Home