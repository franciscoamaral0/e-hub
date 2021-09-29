import { Container, Typography } from '@material-ui/core'
import TemplateDefault from '../../src/templates/Default'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) =>({
  container:{
    padding: theme.spacing(8,0,6)
  }
}))

const Dashboard = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth='sm'>
        <Typography component='h1' variant='h2' className={classes.container}>
          Meus Anuncios
        </Typography>
      </Container>
    </TemplateDefault>
  )
}

export default Dashboard