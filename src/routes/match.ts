
import { Router } from "express";
import { MatchController } from "../controllers";
const routes = Router();


routes.get("/", MatchController.pull)
routes.get("/:id",MatchController.id)
routes.post("/create", MatchController.create)
routes.put("/update", MatchController.update)
routes.delete("/delete", MatchController.delete)

export default routes;