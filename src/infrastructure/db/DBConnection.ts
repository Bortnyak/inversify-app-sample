import {
  Connection,
  getConnection,
  createConnection,
} from "typeorm";
import * as logger from "npmlog"

export class DatabaseConnection {
  private static dbConnection: Promise<Connection>;

  constructor() {
    DatabaseConnection.dbConnection = null;
  }

  public static getDBConnection(): Promise<Connection> {
    try {
      DatabaseConnection.dbConnection = Promise.resolve(getConnection());
      return DatabaseConnection.dbConnection;
    } catch (e) {
      logger.error("DB","getConnection error");
      DatabaseConnection.dbConnection = null;
    }

    if (!DatabaseConnection.dbConnection) {
      logger.warn("DB", "Create new connection");
      DatabaseConnection.dbConnection = createConnection();
    }
    return DatabaseConnection.dbConnection;
  }
}
