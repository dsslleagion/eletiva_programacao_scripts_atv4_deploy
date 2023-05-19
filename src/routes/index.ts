import { Router, Request, Response } from "express";
import teams from "./teams";
import match from "./match";


const routes = Router()

routes.use("/teams", teams);
routes.use("/match", match);


routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
