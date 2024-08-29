import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV:process.env.NODE_ENV,
  port : process.env.PORT,
  database_url : process.env.DATABASE_URL,
  bcrypt_salt : process.env.BCRYPT_SALT_ROUNDS,
  default_pass:process.env.DEFAULT_PASS,
  
}