import * as logger from "npmlog";
import { injectable } from "inversify";


export interface ILoggerService {
  logError(prefix: string, ...stackTraceMessages: string[]): void;
  logWarn(prefix: string, ...stackTraceMessages: string[]): void;
  logInfo(prefix: string, ...stackTraceMessages: string[]): void;
  setContext (context: Object): void;
}

@injectable()
export class LoggerService implements ILoggerService {
  constructor() {}
  
  private ctx: Object;

  public logError = (prefix: string, ...stackTraceMessages: string[]) => {
    const ctxName = this.ctx?.constructor?.name ?? 'Logger';
    return logger.error(`${ctxName}: ${prefix}`, stackTraceMessages.join(" "));
  }

  public logWarn = (prefix: string, ...stackTraceMessages: string[]) => {
    const ctxName = this.ctx?.constructor?.name ?? 'Logger';
    return logger.warn(`${ctxName}: ${prefix}`, stackTraceMessages.join(" "));
  }

  public logInfo = (prefix: string, ...stackTraceMessages: string[]) => {
    const ctxName = this.ctx?.constructor?.name ?? 'Logger';
    return logger.info(`${ctxName}: ${prefix}`, stackTraceMessages.join(" "));
  }

  public setContext (context: Object): void {
    this.ctx = context;
  }
}