import { getRepository } from "typeorm";
import AppDataSource from "../data-source"
import { Match } from "../entities/Match"
import { Teams } from "../entities/Teams"
import { Request, Response } from 'express';


class MatchController{

    public async pull (req: Request, res: Response) : Promise<Response> {
        try{
            const {limit, offset} = req.body
            const teamsRepository = AppDataSource.getRepository(Match)
            .createQueryBuilder("match")
            .leftJoinAndSelect("match.host", "host")
            .leftJoinAndSelect("match.visitor", "visitor")
            .orderBy("match.date", "DESC")
            .limit(limit)
            .offset(offset)
            .getMany()
            
            return res.json((await teamsRepository))
        }catch(err){
            return res.json({erro: "Não foi possivel pegar os teams"})
        }
    }

    public async id (req: Request, res: Response) : Promise<Response> {
        try{
            const termo:any = req.params.id
            const matchRepository = AppDataSource.getRepository(Match)
                .createQueryBuilder("match")
                .leftJoinAndSelect("match.host", "host")
                .leftJoinAndSelect("match.visitor", "visitor")
                .where("match.host = :host", { host:termo })
                .orWhere("match.visitor = :visitor", { visitor:termo })
                .orderBy("match.date", "DESC")
                .getMany()
            return res.json((await matchRepository))
        }catch(err){
            return res.json({erro: "Não foi possivel pegar os teams"})
        }
    }

    public async create(req: Request, res: Response) : Promise<Response> {
        try{
            const { idhost, idvisitor, date } = req.body
            const matchesRepository = AppDataSource.getRepository(Match)
            const insert = new Match();
            insert.host = idhost
            insert.visitor = idvisitor
            insert.date = date
            const all = await matchesRepository.save(insert)
            const find = await matchesRepository.findOneBy({id: all.id})
            return res.json(find)
        }catch(err){
            return res.json({error: "O nome já existe"})
        }
    }

    public async update (req: Request, res: Response) : Promise<Response> {
        try{
            const { id, idhost, idvisitor, date } = req.body

            const teams = AppDataSource.getRepository(Teams)
            if( await teams.findOneBy({id: idhost}) == null){ return res.json({error: "Mandante desconhecido"}) }
            if(await teams.findOneBy({id: idvisitor}) == null ){ return res.json({error: "Visitante desconhecido"}) }
            
            const matchRepository = AppDataSource
                .createQueryBuilder()
                .update(Match)
                .set({ host: idhost, visitor: idvisitor, date: date })
                .where("id = :id", { id: id })
                .execute()
                
            const findRep = AppDataSource.getRepository(Match)
            const all = await findRep.findOneBy({id: id})

            return res.json(all)
        }catch(err){
            return res.json({error: "Erro ao mudar!"})
        }
    }

    public async delete (req: Request, res: Response) : Promise<Response> {
        try{
            const { id } = req.body
            const matchRepository = AppDataSource.getRepository(Match)
            const find = await matchRepository.findOneBy({id: id})
            
            const all = await matchRepository.delete(find)
            return res.json(all)
        }catch(err){
            return res.json({raw: [], affected: 0})
        }
    }

}



export default new MatchController();