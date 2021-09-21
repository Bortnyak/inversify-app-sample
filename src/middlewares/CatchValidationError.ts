import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";
import { validationResult } from "express-validator";

export class CatchValidationError extends BaseMiddleware {
  constructor() {
    super();
  }

  handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.mapped();
      return res.status(400).json({ success: false, error });
    }

    return next();
  }
}
