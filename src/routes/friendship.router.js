import express from "express";
import {
  countUserFrendsController,
  getUserFrendsController,
} from "../controllers/frendship.controller";

const router = express.Router();

// get friends by id
router.route("/:id").get(getUserFrendsController);
// count frend by id
router.route("/:id/count").get(countUserFrendsController);

export default router;
