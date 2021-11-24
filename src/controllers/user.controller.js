import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user.service";

// se puede poner en una clase

export async function getUsersController(req, res) {
  const users = await getUsers();
  return res.status(200).send(users);
}

export async function getUserByIdController(req, res) {
  const id = req.params.id;
  const user = await getUserById(id);
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(404).send("Not found");
}

export async function createUserController(req, res) {
  const { email, username, password, latitude, longitude, language } = req.body;
  // to do validate entry

  const user = await createUser(
    email,
    username,
    password,
    latitude,
    longitude,
    language
  );
  console.log(user, "controller");
  if (user) {
    return res.status(200).send(user);
  }
  return res.status(400).send("Bad request");
}

export async function updateUserController(req, res) {
  const id = req.params.id;
  const { email, username, password, latitude, longitude, language } = req.body;

  const user = await updateUser(
    id,
    email,
    username,
    password,
    latitude,
    longitude,
    language
  );

  if (user) {
    return res.status(200).send(user);
  }
  return res.status(400).send("bad request");
}

export async function deleteUserController(req, res) {
  const id = req.params.id;
  const success = await deleteUser(id);
  if (success) {
    return res.status(200).send("ok");
  }
  return res.status(400).send("Not found");
}
