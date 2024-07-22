import express from "express";
import { check, deepgramApi } from "../controllers/controller.js";

const router = express.Router();

router.route("/").get(check);
router.route("/deepgram").post(deepgramApi);

export default router;