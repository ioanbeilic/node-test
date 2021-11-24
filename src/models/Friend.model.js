import { DataTypes, Model } from "sequelize";
import { sequelize } from "./database/database";

export class Friendships extends Model {}

Friendships.init(
  {
    id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.STRING },
    friend_id: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "friendships",
  }
);
