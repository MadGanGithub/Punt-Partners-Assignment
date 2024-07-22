import express from "express";
import { check } from "../controllers/controller.js";

const router = express.Router();

router.route("/").get(check);

export default router;