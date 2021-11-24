import { DataTypes, Model } from "sequelize";
import { sequelize } from "./database/database";

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    longitude: { type: DataTypes.STRING },
    lattitude: { type: DataTypes.STRING },
    language: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "users",
  }
);
