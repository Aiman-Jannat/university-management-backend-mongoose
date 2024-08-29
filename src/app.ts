import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';
const app = express()
const port = 3000



//parsers
app.use(express.json())
app.use(cors())

app.use('/api/v1/', router);


app.get('/', (req: Request, res: Response) => {
  try{
    console.log(req.body);
  res.send('Hello World!');
  }catch (error) {
    console.error(error);
    
  }
})

// const test = (req:Request, res:Response)=>{
//   Promise.reject();
// }

// app.get('/',test);


app.get('/',(req:Request, res:Response)=>{
  res.send("Hello World");
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
