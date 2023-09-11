import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'

//dirname para modulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default __dirname

//utilidades para password hashing y validacion
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)


