import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from "dotenv";

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import eventRoutes from "./routes/eventRoutes";
import { swaggerUi, swaggerSpec } from "./swagger";
import { connectToDatabase } from "./services/mongoClient.service";

dotenv.config();
const app = express();

// Configurer CORS pour autoriser les requêtes venant de votre front-end
app.use(cors({
  origin: 'http://localhost:4200', // Remplacez cette URL par celle de votre front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', eventRoutes);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function(req : Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

connectToDatabase()
    .catch((error) => {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    });


export default app;
