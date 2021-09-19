import { Container } from "inversify";
import TYPES from "./identifiers";

import { ILoggerService, LoggerService } from "../../services/LoggerService";


import { UserService } from "../../services/UserService"
import { IUserService } from "../../interfaces/IUserService";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { UserRepository } from "../../repositories/UserRepository";


const container = new Container();

container.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);

// USER
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);



export default container;
