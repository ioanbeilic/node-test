import express from "express";

const router = express.Router();

import {
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController,
} from "../controllers/user.controller";

/**
 * documentacion tecnica, tipo swagger.
 */

// get all
router.route("/").get(getUsersController);
// get by id
router.route("/:id").get(getUserByIdController);
// create
router.route("/").post(createUserController);
// edit
router.route("/:id").put(updateUserController);
// delete
router.route("/:id").delete(deleteUserController);

export default router;
