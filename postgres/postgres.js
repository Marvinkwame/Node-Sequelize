import { Sequelize } from "sequelize";
import { createUserMode } from "../models/userModel.js";

const sequelize = new Sequelize("sequelizedb", "postgres", "marvin123", {
  host: "localhost",
  dialect: "postgres",
});

let UserModel = null

const PostgresConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    UserModel = await createUserMode(sequelize)
    await sequelize.sync()
    console.log('Database synced')
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { PostgresConnection, UserModel };
