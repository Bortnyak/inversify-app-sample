import { Request } from "express";

export class JWTHelper {
  constructor(private req: Request) {}

  public getToken() {
    let token =
      <string>this.req.headers["x-access-token"] ||
      this.req.headers["authorization"];

    const notSuppliedError = "Auth token is not supplied";
    if (!token) {
      throw Error(notSuppliedError);
    }

    const bearer: string = token.substring(0, 6).toLowerCase();

    if (bearer !== "bearer" || !token) {
      throw Error(notSuppliedError);
    }

    token = token.slice(7, token.length);
    return token;
  }
}
