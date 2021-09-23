const TYPES = {
  ILoggerService: Symbol("ILoggerService"),
  CatchValidationError: Symbol("CatchValidationError"),
  IUserService: Symbol("IUserService"),
  IUserRepository: Symbol("IUserRepository"),
  IAuthService: Symbol("IAuthService"),
  IAuthMiddleware: Symbol("IAuthMiddleware"),
  IChildRepository: Symbol("IChildRepository"),
  IChildService: Symbol("IChildService"),
  IUserChildRepository: Symbol("IUserChildRepository"),
  IUserChildService: Symbol("IUserChildService"),
  ICreditCardRepository: Symbol("ICreditCardRepository"),
  ICreditCardService: Symbol("ICreditCardService"),
  IPaymentTransactionRepository: Symbol("IPaymentTransactionRepository"),
  IPaymentTransactionService: Symbol("IPaymentTransactionService"),
};

export default TYPES;