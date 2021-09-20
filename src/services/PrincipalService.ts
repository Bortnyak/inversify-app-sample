import { interfaces } from "inversify-express-utils";
import { IUser } from "../interfaces/IUser";

export interface IPrincipal extends interfaces.Principal {}

export class Principal implements interfaces.Principal {
 details: IUser;

 public constructor(details: IUser) {
   this.details = details;
 }

 isAuthenticated(): Promise<boolean> {
   throw new Error("Method not implemented.");
 }

 isResourceOwner(resourceId: any): Promise<boolean> {
   throw new Error("Method not implemented.");
 }

 isInRole(role: string): Promise<boolean> {
   throw new Error("Method not implemented.");
 }
 
}
