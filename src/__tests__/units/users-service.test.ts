import "reflect-metadata";
import { expect } from "chai"
import { LoggerService } from "../../services/LoggerService";  
import { UserRepositoryMock } from "../mock/repositories/userRepositoryMock";
import { UserService } from "../../services/UserService"; 
import { ICreateUser } from "../../interfaces/ICreateUser";

const loggerService = new LoggerService();
const userRepository = new UserRepositoryMock();
const userService = new UserService(loggerService, userRepository);


describe("Users service", () => {

  describe("User signup", () => {
    it("User successfully signup", async () => {
      const signUpPayload: ICreateUser = {
        name: "TestUser",
        email: "testuser@test.com",
        password: "123",
      };

      const expectedResult = { id: 1, name: 'TestUser', email: 'testuser@test.com' };
      const userSignedUp = await userService.register(signUpPayload);
      expect(expectedResult.id).to.equal(userSignedUp.id);
    });

    it("Signup with the same email throws error", async () => {
      const signUpPayload: ICreateUser = {
        name: "TestUser",
        email: "testuser@test.com",
        password: "123",
      };

      let expectedError = "User already exists";
      let actualError = "";

      try {
        await userService.register(signUpPayload);
      } catch (e) {
        actualError = e.message;
      }
      expect(expectedError).to.equal(actualError);
    });
  });
  
});