import express from "express";
import { add, allEvent, getEventById } from "../controller/event.controller.js";

const eventRouter = express.Router();

eventRouter.route("/add").post(add);
eventRouter.route("/").get(allEvent);
eventRouter.route("/:id").get(getEventById)

export default eventRouter;