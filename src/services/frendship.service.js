import { QueryTypes } from "sequelize";
import { sequelize } from "../database/database";
import { processSouthern } from "./user-api.service";

export const getUserFrends = async (id) => {
  try {
    const friends = await sequelize.query(
      "select * from friendships Join users on users.id = friendships.friend_id where user_id=:id;",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      }
    );
    // get friends fromapi
    const friendsFromUserApi = await processSouthern();

    return [...friends, ...friendsFromUserApi];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const countUserFrends = async (id) => {
  try {
    const localCount = await sequelize.query(
      "select count(*) as count from friendships join users on users.id = friendships.friend_id where user_id=:id;",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      }
    );

    //  if user is not in local database get from api
    const friendsFromUserApi = await processSouthern();

    const countFromApi = 0;
    if (Array.isArray(friendsFromUserApi)) {
      countFromApi = friendsFromUserApi.length;
    }
    const count = localCount[0] ? localCount[0].count : 0;

    return count + countFromApi;
  } catch (error) {
    console.log(error);
    return null;
  }
};
