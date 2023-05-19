import { getRepository } from "typeorm";
import { Teams } from "../entities/Teams";
import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { Like } from "typeorm";

class TeamsController{

    public async create(req: Request, res: Response): Promise<Response> {
        try {
          const { name } = req.body;
          console.log(name);
      
          const team = new Teams();
          team.name = name;
      
          const teams = await AppDataSource.getRepository(Teams).save(team);
      
          return res.json({ teams });
        } catch (error) {
          console.error(error);
      
          if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Erro' });
          }
      
          return res.status(500).json({ error: 'Nome já existe' });
        }
      }
      
    public async update(req: Request, res: Response): Promise<Response> {
        try {
          const { id, name } = req.body;
          console.log(name);
      
          const team = await AppDataSource.getRepository(Teams).findOneBy({ id });
          if (!team) {
            return res.status(404).json({ error: 'Time não encontrado' });
          }
      
          team.name = name;
      
          const updatedTeam = await AppDataSource.getRepository(Teams).save(team);
      
          return res.json({ team: updatedTeam });
        } catch (error) {
          console.error(error);
      
          return res.status(500).json({ error: 'Erro ao atualizar o time' });
        }
      }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
          const { id } = req.body;
      
          const deleteResult = await AppDataSource.getRepository(Teams).delete({ id });
      
          if (deleteResult.affected === 0) {
            return res.status(404).json({ error: 'Time não encontrado' });
          }
      
          return res.json({ success: true });
        } catch (error) {
          console.error(error);
      
          return res.status(500).json({ error: 'Erro ao excluir o time' });
        }
      }
      
    public async pull(req: Request, res: Response): Promise<Response> {
        try {
          const teams = await AppDataSource.getRepository(Teams).find({
            order: {
              name: 'ASC',
            },
          });
      
          return res.json({ teams });
        } catch (error) {
          console.error(error);
      
          return res.status(500).json({ error: 'Erro ao obter os times' });
        }
      }
      
    
    public async pullTermo(req: Request, res: Response): Promise<Response> {
      try {
        const termo = req.params.termo;
        
        const teams = await AppDataSource.getRepository(Teams).find({
          where: { name: Like(`%${termo}%`) },
          order: {
            name: 'ASC',
          },
        });
    
        return res.json({ teams });
      } catch (error) {
        console.error(error);
    
        return res.status(500).json({ error: 'Erro ao buscar os times' });
      }
    }
    
      


}

export default new TeamsController();