import "reflect-metadata";

import * as express from 'express';
import "express-async-errors";
// import swaggerUi from 'swagger-ui-express';

// import swaggerFile from './swagger.json';

import '@shared/infra/typeorm';

import '@shared/container';

import { router } from './routes';
import { AppError } from "@shared/errors/AppError";

const app = express();

app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.use(
    (err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          error: err.message
        })
      }
      return response.status(500).json({
        status: 'error',
        error: 'Internal server error' 
      })
    }
);

app.listen(3333,  () => console.log("Server is running!"))