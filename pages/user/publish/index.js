import { Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import {
  Box,
  Button,
  Container,
  Select,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  MenuItem,
  FormHelperText,
  Input,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "./publish.styles";


import useToasty from '../../../src/contexts/Toasty'
import TemplateDefault from "../../../src/templates/Default";
import { initialValues, validationSchema } from "./formValues";
import FileUpload from "../../../src/components/FileUpload";
import axios from "axios";
import { getSession } from "next-auth/client";


const Publish = ({userId, image}) => {
  const classes = useStyles();
  const {setToasty} = useToasty()
  const router = useRouter()

  const formValues ={
    ...initialValues,
  }

  formValues.userId = userId
  formValues.image = image


  const handleSucess = () => {
    setToasty({
      open: true,
      text: 'Anuncio registado com sucesso',
      severity: 'success'
    })

    router.push('/user/dashboard')
  }

  const handleError =() => {
    setToasty({
      open: true,
      text: 'Ops, ocorreu um error, tente novamente!',
      severity: 'error'

    })
  }

  const handleFormSubmit = (values) =>{
    const formData = new FormData()

    for (let field in values){
      if (field === 'files'){
        values.files.forEach(file =>{
          formData.append('files', file)
        })
      } else{
        formData.append(field, values[field])
      }
    }
    axios.post('/api/products/post' , formData).then(handleSucess).catch(handleError)
  }

  // const [files, setFiles] = useState([]);

  return (
    <TemplateDefault>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          touched,
          values,
          errors,
          isSubmitting,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>

            <Input type='hidden' name='userId' value={values.userId}/>
            <Input type='hidden' name='image' value={values.image}/>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                >
                  Publicar An??ncio
                </Typography>
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                >
                  Insira o mais detalhado possivel!
                </Typography>
              </Container>
              <br />
              <br />
              <Container maxWidth="md" className={classes.boxContaier}>
                <Box className={classes.box}>
                  <FormControl error={errors.title && touched.title} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      T??tulo do An??ncio*
                    </InputLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormHelperText>{errors.title}</FormHelperText>
                  </FormControl>

                  <br />
                  <br />

                  <FormControl
                    error={errors.category && touched.category}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      {" "}
                      Categorias*{" "}
                    </InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="">Selecionar</MenuItem>
                      <MenuItem value="Beb?? e Crian??a">Beb?? e Crian??a</MenuItem>
                      <MenuItem value="Agricultura">Agricultura</MenuItem>
                      <MenuItem value="Moda">Moda</MenuItem>
                      <MenuItem value="Carros,Motos e Barco">
                        Carros,Motos e Barcos
                      </MenuItem>
                      <MenuItem value="Servi??os">Servi??os</MenuItem>
                      <MenuItem value="Lazer">Lazer</MenuItem>
                      <MenuItem value="Moveis, Casa e Jardim">
                        Moveis, Casa e Jardim
                      </MenuItem>
                      <MenuItem value="Im??veis">Im??veis</MenuItem>
                      <MenuItem value="Equipamentos E Ferramentas">
                        Equipamentos E Ferramentas
                      </MenuItem>
                      <MenuItem value="Telemoveis e Tablets">
                        Telemoveis e Tablets
                      </MenuItem>
                      <MenuItem value="Esporte">Esporte</MenuItem>
                      <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                      <MenuItem value="Emprego">Emprego</MenuItem>
                      <MenuItem value="Outros">Outros</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.category && touched.category
                        ? errors.category
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FileUpload 
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue = {setFieldValue}
                  />
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl
                    error={errors.description && touched.description}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Escreva os detalhes sobre seu produto*
                    </InputLabel>
                    <Input
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                    <FormHelperText>
                      {errors.description && touched.description
                        ? errors.description
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl error={errors.price && touched.price} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Pre??o*
                    </InputLabel>
                    <Input
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start"> ??? </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {errors.price && touched.price ? errors.price : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <Typography component="h6" variant="h6" color="textPrimary">
                    Dados de contacto
                  </Typography>
                  <FormControl error={errors.name && touched.name} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Nome*
                    </InputLabel>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.name && touched.name ? errors.name : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl error={errors.email && touched.email} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      E-mail*
                    </InputLabel>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.email && touched.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl error={errors.phone && touched.phone} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Telefone de contacto*
                    </InputLabel>
                    <Input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.phone && touched.phone ? errors.phone : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box textAlign="right">
                {
                  isSubmitting
                    ? <CircularProgress maxWidth='md' classeName={classes.loading}/>
                    : <Button type="submit" variant="contained" color="primary">
                        Publicar An??ncio
                      </Button>
                }
                  
                </Box>
              </Container>
            </form>
          );
        }}
      </Formik>
    </TemplateDefault>
  );
};

Publish.requireAuth = true

export async function getServerSideProps({req}){
  const {userId, user} = await getSession({req})


  return{
    props:{
      userId,
      image: user.image,

    }
  }
}

export default Publish;
