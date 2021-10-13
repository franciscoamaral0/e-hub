import bcrypt from 'bcryptjs'

const crypto =  (pwd) =>{
  const password =  bcrypt.hashSync(pwd)

  return password
}


const compare = (password, hash) =>{
  const result = bcrypt.compare(password, hash)

  return result
}

export {
  crypto,
  compare
}