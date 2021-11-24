import { QueryTypes } from "sequelize";
import { sequelize } from "../database/database";
import { processSouthern } from "./user-api.service";
import { isSouthOrNorth } from "../utils/isSouthOrNorth";

export const getUsers = async () => {
  try {
    const result = await sequelize.query("select * from users", {
      type: QueryTypes.SELECT,
    });
    const apiResult = await processSouthern();
    // get  all users
    return [...result, ...apiResult];
  } catch (error) {
    return [];
  }
};

export const getUserById = async (id) => {
  try {
    let user = await sequelize.query("select * from users where id=:id", {
      replacements: {
        id,
      },
      type: QueryTypes.SELECT,
    });
    if (!user) {
      //  if user is not in local database get from api
      user = await processSouthern();
    }
    return user;
  } catch (error) {
    return null;
  }
};

export const createUser = async (
  email,
  username,
  password,
  latitude,
  longitude,
  language
) => {
  let user;
  const zone = await isSouthOrNorth(Number(latitude), Number(longitude));

  try {
    if (zone === "N") {
      // array with afected row and id
      const [id, afected] = await sequelize.query(
        "INSERT INTO users (email, username, password, latitude,longitude, language) VALUES (:data)",
        {
          replacements: {
            data: [email, username, password, latitude, longitude, language],
          },
          type: QueryTypes.INSERT,
        }
      );
      if (afected) {
        user = await sequelize.query("Select * from users where id =:id", {
          replacements: {
            id,
          },
          type: QueryTypes.SELECT,
        });
      }
      console.log(user);
      return user;
    } else if (zone === "S") {
      // create user ok external api
      user = await processSouthern();
      console.log(user);
      return user;
    }
    console.log(user);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (
  id,
  email,
  username,
  password,
  latitude,
  longitude,
  language
) => {
  let user;
  const zone = await isSouthOrNorth(Number(latitude), Number(longitude));
  console.log(zone);
  try {
    if (zone == "N") {
      // return array wit fir element undefines and second affected row
      const [_, affected] = await sequelize.query(
        "Update users set email=:email, username=:email, password=:password, latitude=:latitude, longitude=:longitude, language=:language where id=:id",
        {
          replacements: {
            email,
            username,
            password,
            latitude,
            longitude,
            language,
            id,
          },
          type: QueryTypes.UPDATE,
        }
      );

      if (affected) {
        user = await sequelize.query("Select * from users where id =:id", {
          replacements: {
            id,
          },
          type: QueryTypes.SELECT,
        });
      }

      return user;
    } else if (zone === "S") {
      // update user on external api
      user = await processSouthern();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    // to do - check if user exist and retorn 404 on controler
    await sequelize.query("delete from users where id=:id", {
      replacements: {
        id,
      },
      type: QueryTypes.DELETE,
    });
    // delete proces to external api
    await processSouthern();
    return "ok";
  } catch (error) {
    console.log(error);
    return null;
  }
};
