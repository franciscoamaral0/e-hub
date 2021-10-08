import * as yup from 'yup'

const initialValues = {
  name:'',
  email:'',
  password:'',
  passwordConfirm:''
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Minímo de 6 caracteres').required('Campo obrigatório'),
  passwordConfirm: yup.string().required('Campo obrigatório').oneOf([yup.ref('password'), null], 'Senhas nao coincidem, por favor verificar'),
})



export {initialValues, validationSchema} 