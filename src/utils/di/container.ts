import { Container } from "inversify";
import TYPES from "./identifiers";

import { ILoggerService, LoggerService } from "../../services/LoggerService";
import { IAuthMiddleware, AuthMiddleware } from "../../middlewares/AuthMiddleware";

import { IAuthService } from "../../interfaces/IAuthService"; 
import { AuthService } from "../../services/AuthService";

import { UserService } from "../../services/UserService"
import { IUserService } from "../../interfaces/IUserService";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { UserRepository } from "../../repositories/UserRepository";

import { IChildRepository } from "../../interfaces/IChildRepository";
import { ChildRepository } from "../../repositories/ChildRepository";
import { IChildService } from "../../interfaces/IChildService";
import { ChildService } from "../../services/ChildService";

import { IUserChildRepository } from "../../interfaces/IUserChildRepository";
import { UserChildRepository } from "../../repositories/UserChildRepository";
import { IUserChildService } from "../../interfaces/IUserChildService";
import { UserChildService } from "../../services/UserChildService";

const container = new Container();

container.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);

// AUTH
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IAuthMiddleware>(TYPES.IAuthMiddleware).to(AuthMiddleware);

// USER
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// CHILD
container.bind<IChildRepository>(TYPES.IChildRepository).to(ChildRepository);
container.bind<IChildService>(TYPES.IChildService).to(ChildService);

// USER_CHILD
container.bind<IUserChildRepository>(TYPES.IUserChildRepository).to(UserChildRepository);
container.bind<IUserChildService>(TYPES.IUserChildService).to(UserChildService);


export default container;
