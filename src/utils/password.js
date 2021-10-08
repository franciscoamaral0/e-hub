import bcrypt from 'bcryptjs'

const crypto =  (pwd) =>{
  const password =  bcrypt.hashSync(pwd)

  return password
}


export {
  crypto,
}