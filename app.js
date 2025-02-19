import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import adminRouter from '../Backend/routes/admin.js'
import usersRouter from '../Backend/routes/users.js'
import foodRouter from './routes/foodRoute.js';


dotenv.config()




const app = express();
connectDB();

//api endpoints

app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use("/api/food",foodRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// }


app.listen(process.env.PORT, ()=>{
  console.log(`Example app listening on port ${process.env.PORT}`);
})