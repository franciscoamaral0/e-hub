import {
  Box,
  Button,
  Container,
  Select,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

import TemplateDefault from '../../src/templates/Default'
import { useState } from 'react'

const useStyles = makeStyles((theme) =>({
  mask: {},
  mainImage:{},
  
  boxContainer:{
    paddingBottom: theme.spacing(3),
  
  },
  box:{
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3)
  },
  thumbsContainer: {
    display: 'flex',
    marginTop: 15,
    flexWrap: 'wrap'
  },
  // Area interna com borda dashed
  dropZone:{
    display: 'flex',
    
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: ' center',
    padding: 10,
    margin: '0 15px 15px 0',

    width: 200,
    height: 150,
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black'
  },
  thumb:{
    position: 'relative',
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    margin: '0 15px 15px 0',
    
  // Destaque da foto principal
    '& $mainImage':{
      backgroundColor:'#c8f8f6',
      padding: '6px 10px',
      position:'absolute',
      bottom: '0',
      left: '0'
    },
// Hover no thumb
    '&:hover $mask' :{
      display:'flex'
    }, 
// Mascara negra 
    '& $mask': { 
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height:'100%',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: ' center',
    
  }
  }
}))




const Publish = () => {
  const classes = useStyles()

  const [files, setFiles] = useState([])

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) =>{
      console.log(acceptedFile)
      const newFiles = acceptedFile.map(element => {
        return Object.assign(element, {
          preview: URL.createObjectURL(element)
        })
      })
      setFiles([
        ...files,
        ...newFiles])
    }
  })

  const handleRemoveFile = (fileName) =>{
    const newFileState = files.filter((file) => file.name !== fileName)
    setFiles(newFileState)
  }

  
  return(
    <TemplateDefault>
      <Container maxWidth='sm'>
        <Typography component='h1' variant='h2' align='center' color='textPrimary' >
          Publicar Anúncio
        </Typography>
        <Typography component='h5' variant='h5' align='center' color='textPrimary'>
          Insira o mais detalhado possivel!
        </Typography>
      </Container>
        <br/><br/>
        <Container maxWidth='md' className={classes.boxContaier}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6'  color='textPrimary'>
              Título do Anúncio
            </Typography>
            <TextField
              label='ex: Iphone 12 com garantia'
              size='small'
              fullWidth
            />
            <br /><br />
            <Typography component='h6' variant='h6'  color='textPrimary'>
              Categorias
            </Typography>
            <Select
              native
              value=''
              fullWidth
              onChange={()=>{}}
              inputProps={{
                name: 'age',
              }}>
                <option value='1'>Selecionar</option>
                <option value={1}>Bebê e Criança</option>
                <option value={2}>Agricultura</option>
                <option value={3}>Moda</option>
                <option value={4}>Carros,Motos e Barcos</option>
                <option value={5}>Serviços</option>
                <option value={6}>Lazar</option>
                <option value={7}>Moveis, Casa e Jardim</option>
                <option value={8}>Imóveis</option>
              </Select>
          </Box>
        </Container>

        <Container maxWidth='md' className={classes.boxContainer}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6'  color='textPrimary'>
              Imagens
            </Typography>
            <Typography component='div' variant='body2'  color='textPrimary'>
              A primeira Imagem é a foto principal do seu anúncio
            </Typography>
            <Box className={classes.thumbsContainer}> 
            
              <Box className={classes.dropZone} {...getRootProps()}>
              <input {...getInputProps()}/>  
                <Typography variant='body2' color='textPrimary'>
                  Clique para adicionar ou arraste a imagem aqui.
                </Typography>
              </Box>
              
              {files.map((file,index) => (
                <Box 
                key={file.name}

                className={classes.thumb}
                style={{ backgroundImage: `url(${file.preview})`}}
                >
                {
                  index === 0 ? 
                  <Box className={classes.mainImage}> 
                    <Typography variant='body2' color='textPrimary'>
                      Principal
                    </Typography>
                  </Box> : 
                  null
                }
                  
                  <Box className={classes.mask}>
                    <IconButton color='secondary' onClick={() =>handleRemoveFile(file.name)}  >
                      <DeleteForever fontSize='large'/>

                    </IconButton>
                  </Box>
                </Box>
              ))}
              

            </Box>
          </Box>
        </Container>
                    


        <Container maxWidth='md' className={classes.boxContainer}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6'  color='textPrimary'>
              Descrição
            </Typography>
            <Typography component='div' variant='body2'  color='textPrimary'>
              Escreva os detalhes sobre seu produto.
            </Typography>
            <TextField
              multiline
              rows={6}
              variant='outlined'
              fullWidth
            />
          </Box>
        </Container>
              
        
        <Container maxWidth='md' className={classes.boxContainer}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6'  color='textPrimary'>
              Preço
            </Typography>
            <br/>
            <FormControl
            variant='outlined'
            fullWidth
            >
            <InputLabel>Valor</InputLabel>
            <OutlinedInput 
              onChange={()=>{}}
              startAdornment={<InputAdornment position='start'> € </InputAdornment>} 
              labelWidth={40}
            />
            </FormControl>
          </Box>
        </Container>
        
        
        
        <Container maxWidth='md' className={classes.boxContainer}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6'  color='textPrimary'>
            Dados de contacto

            </Typography>
              
            <TextField
              label='Nome'
              size='small'
              fullWidth
              variant='outlined'
            />
            <br /> <br />
            <TextField
              label='E-mail'
              size='small'
              fullWidth
              variant='outlined'
            />
            <br /> <br />
            <TextField
              label='Telefone'
              size='small'
              fullWidth
              variant='outlined'
            />
          </Box>
        </Container>
           
        <Container maxWidth='md' className={classes.boxContainer}>
          <Box textAlign='right'>
            <Button variant='contained' color='primary'>Publicar Anúncio</Button>
          </Box>
        </Container>
    </TemplateDefault>
  )
}


export default Publish