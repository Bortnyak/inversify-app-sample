import { LoggerService } from "../infrastructure/Logger/LoggerService"

const loggerService = new LoggerService();

export const CatchError = (errorMessage: string) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const fn = descriptor.value;
  descriptor.value = async (...args) => {
    try {
      return await fn.apply(target, args);
    } catch (error) {
      loggerService.logError(errorMessage, error);
      throw new Error(errorMessage);
    }
  };
};