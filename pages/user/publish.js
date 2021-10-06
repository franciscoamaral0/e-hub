import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

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
  InputAdornment,
  MenuItem,
  FormHelperText,
  Input,
} from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core";
import { DeleteForever, ErrorSharp } from "@material-ui/icons";

import TemplateDefault from "../../src/templates/Default";
import { number } from "yup/lib/locale";

const useStyles = makeStyles((theme) => ({
  mask: {},
  mainImage: {},

  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  thumbsContainer: {
    display: "flex",
    marginTop: 15,
    flexWrap: "wrap",
  },
  inputLabel:{
    fontWeight: 400,
    color: theme.palette.primary.main
  },
  // Area interna com borda dashed
  dropZone: {
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    textAlign: " center",
    padding: 10,
    margin: "0 15px 15px 0",

    width: 200,
    height: 150,
    backgroundColor: theme.palette.background.default,
    border: "2px dashed black",
  },
  thumb: {
    position: "relative",
    width: 200,
    height: 150,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    margin: "0 15px 15px 0",

    // Destaque da foto principal
    "& $mainImage": {
      backgroundColor: "#c8f8f6",
      padding: "6px 10px",
      position: "absolute",
      bottom: "0",
      left: "0",
    },
    // Hover no thumb
    "&:hover $mask": {
      display: "flex",
    },
    // Mascara negra
    "& $mask": {
      backgroundColor: "rgba(0,0,0,0.7)",
      width: "100%",
      height: "100%",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      textAlign: " center",
    },
    
  },
}));

const Publish = () => {
  const classes = useStyles();

  const [files, setFiles] = useState([]);



  const validationSchema = yup.object().shape({
    title: yup.string()
      .min(6, "Por favor, insira um título com no minimo 6 caracteres.")
      .max(60, "Titulo com no maximo 60 caracteres.")
      .required("Campo Obrigatório."),
    category: yup.string()
      .required("Campo Obrigatório"),
    description: yup.string().required('Campo Obrigatório')
      .min(50, "Escreva uma descrição com no minimo 50 caracteres")
      .max(200, "Limite de 200 caracteres Atingido"),
    price: yup.number().required('Campo Obrigatório'),
    name: yup.string().required('Campo Obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('Campo Obrigatório'),
    phone: yup.number().required('Campo Obrigatório'),
    files: yup.array().min(2, 'Envie pelo menos duas fotos').required('Campo Obrigatório')

    
  });

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: "",
          category: "",
          description: "",
          price:'',
          name: '', 
          email: '',
          phone: '',
          files: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("ok enviou form", values);
        }}
      >
        {({touched ,values, errors, handleChange, handleSubmit, setFieldValue }) => {
          const { getRootProps, getInputProps } = useDropzone({
            accept: "image/*",
            onDrop: (acceptedFile) => {
              console.log(acceptedFile);
              const newFiles = acceptedFile.map((element) => {
                return Object.assign(element, {
                  preview: URL.createObjectURL(element),
                });
              });
              setFieldValue('files',[...values.files, ...newFiles]);
            },
          });

          const handleRemoveFile = (fileName) => {
            const newFileState = values.files.filter((file) => file.name !== fileName);
            setFieldValue('files',newFileState);
          };
          



          return (
            <form onSubmit={handleSubmit}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                >
                  Publicar Anúncio
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
                    <InputLabel className={classes.inputLabel}>Título do Anúncio*</InputLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormHelperText>{errors.title && touched.title ? errors.title : null}</FormHelperText>
                  </FormControl>

                  <br />
                  <br />

                  <FormControl error={errors.category && touched.category } fullWidth>
                    <InputLabel className={classes.inputLabel}> Categorias* </InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="">Selecionar</MenuItem>
                      <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                      <MenuItem value="Agricultura">Agricultura</MenuItem>
                      <MenuItem value="Moda">Moda</MenuItem>
                      <MenuItem value="Carros,Motos e Barco">
                        Carros,Motos e Barcos
                      </MenuItem>
                      <MenuItem value="Serviços">Serviços</MenuItem>
                      <MenuItem value="Lazer">Lazer</MenuItem>
                      <MenuItem value="Moveis, Casa e Jardim">
                        Moveis, Casa e Jardim
                      </MenuItem>
                      <MenuItem value="Imóveis">Imóveis</MenuItem>
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
                    <FormHelperText>{errors.category && touched.category  ? errors.category : null}</FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <Typography component="h6" variant="h6" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                    Imagens
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    color={errors.files && touched.files ? 'error' : 'textPrimary'}
                  >
                    A primeira Imagem é a foto principal do seu anúncio
                  </Typography>
                  {
                    errors.files && touched.files 
                    ? <Typography variant='body2' color='error'>{errors.files}</Typography>
                    : 'textPrimary'
                  }
                  <Box className={classes.thumbsContainer}>
                    <Box className={classes.dropZone} {...getRootProps()}>
                      <input name='files' {...getInputProps()} />
                      <Typography variant="body2" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                        Clique para adicionar ou arraste a imagem aqui.
                      </Typography>
                    </Box>

                    {values.files.map((file, index) => (
                      <Box
                        key={file.name}
                        className={classes.thumb}
                        style={{ backgroundImage: `url(${file.preview})` }}
                      >
                        {index === 0 ? (
                          <Box className={classes.mainImage}>
                            <Typography variant="body2" color="textPrimary">
                              Principal
                            </Typography>
                          </Box>
                        ) : null}

                        <Box className={classes.mask}>
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveFile(file.name)}
                          >
                            <DeleteForever fontSize="large" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl error={errors.description && touched.description} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Escreva os detalhes sobre seu produto*
                    </InputLabel>
                    <Input name='description' value={values.description} onChange={handleChange} multiline rows={6} variant="outlined" />
                    <FormHelperText>{errors.description && touched.description ? errors.description : null}</FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl error={errors.price && touched.price} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Preço*
                    </InputLabel>
                    <Input
                    name='price'
                    value={values.price}
                    onChange={handleChange}
                    variant="outlined"
                    startAdornment={
                        <InputAdornment position="start"> € </InputAdornment>
                      }

                    />
                    <FormHelperText>{errors.price && touched.price ? errors.price : null}</FormHelperText>
                  </FormControl>

                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                  <Typography component="h6" variant="h6" color="textPrimary">
                    Dados de contacto
                  </Typography>

                  <FormControl error={errors.name && touched.name} fullWidth>
                      <InputLabel className={classes.inputLabel}>Nome*</InputLabel>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormHelperText>{errors.name && touched.name ? errors.name : null}</FormHelperText>
                    </FormControl>
                  <br /> <br />
                  <FormControl error={errors.email && touched.email} fullWidth>
                      <InputLabel className={classes.inputLabel}>E-mail*</InputLabel>
                      <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormHelperText>{errors.email && touched.email ? errors.email : null}</FormHelperText>
                    </FormControl>
                  <br /> <br />
                  <FormControl error={errors.phone && touched.phone} fullWidth>
                      <InputLabel className={classes.inputLabel}>Telefone de contacto*</InputLabel>
                      <Input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <FormHelperText>{errors.phone && touched.phone ? errors.phone : null}</FormHelperText>
                    </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={classes.boxContainer}>
                <Box textAlign="right">
                  <Button type="submit" variant="contained" color="primary">
                    Publicar Anúncio
                  </Button>
                </Box>
              </Container>
            </form>
          );
        }}
      </Formik>
    </TemplateDefault>
  );
};

export default Publish;
