import { LoggerService} from "../services/LoggerService";
export interface HttpExceptionHelper {
  parseError(errorMessage: string): { statusCode: number, errorMessage: string };
}

export class HttpExceptionHelper implements HttpExceptionHelper {
  static parseError(
    error: HttpException | Error
  ): { statusCode: number; errorMessage: string } {
    const response = {
      statusCode: 500,
      errorMessage: "Something went wrong",
    };
    if (error instanceof HttpException) {
      response.statusCode = error.statusCode;
      response.errorMessage = error.message;
      return response;
    }
    const logger = new LoggerService();
    logger.logError("Internal server error", error.message);
    return response;
  }
}

export class HttpException extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
