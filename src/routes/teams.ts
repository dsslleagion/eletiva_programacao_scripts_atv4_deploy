import { Router } from "express";
import { TeamsController } from "../controllers";



const routes = Router();

routes.post("/create", TeamsController.create); 
routes.put("/update", TeamsController.update);
routes.delete("/delete", TeamsController.delete);
routes.get('/', TeamsController.pull);
routes.get('/:termo', TeamsController.pullTermo);



export default routes;