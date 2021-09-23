import { urlencoded, json} from "body-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as swagger from "swagger-express-ts";
import * as express from "express";
import container from "./utils/di/container";
import * as cors from "cors";
import config from "./config";
import * as logger from "npmlog";
// import * as morgan from "morgan";
import { HttpExceptionHelper, HttpException } from "./utils/HTTPExceptionHelper";


import "./controllers/index";


let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: config.apiRootPath },
  null,
  null
);


server.setErrorConfig((app) => {
  app.use((
    err: HttpException | Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    ) => {
    const { statusCode, errorMessage } = HttpExceptionHelper.parseError(err);
    res.status(statusCode).json({ success: false, error: errorMessage });
    next();
  });
});

server.setConfig((app) => {
  // app.use(morgan("common"));
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: "50mb" }));


  // create swagger template
  app.use('/api-docs/swagger', express.static( 'swagger' ));
  app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));


  //cors
  app.use(cors(config.corsOptions));

  app.use(
    swagger.express({
      definition: {
        basePath: config.apiRootPath,
        info: {
          title: "Wallet API",
          version: "1.0"
        },
        externalDocs: {
          url: "0.0.0.0:8083"
        },
        securityDefinitions: {
          BearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
          }
        }
      }
    })
  );

});

let app = server.build();
app.listen(config.nodePort);
logger.info("info", `Server started on port ${config.nodePort}`);

exports = module.exports = app;
