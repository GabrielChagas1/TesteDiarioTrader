import { Request, Response } from "express";
import { centroCustoRepository } from '../repositories/centroCustoRepository';

export class CentroCustoController{
    async create(req: Request, res: Response){
        const {nome, descricao} = req.body;

        if(!nome) return res.status(400).json({message: 'O nome é obrigatório'})

        try {
            const newCentroCusto = centroCustoRepository.create({nome, descricao});
            await centroCustoRepository.save(newCentroCusto);
            return res.status(201).json(newCentroCusto);
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async list(req: Request, res: Response){
        try {
            const centrosCustos = await centroCustoRepository.find();

            return res.status(200).json(centrosCustos);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;
        try {
            const centroCusto = await centroCustoRepository.find({
                where: {
                    id: Number(id)
                }
            });

            await centroCustoRepository.remove(centroCusto);

            return res.status(200).json(centroCusto);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async edit(req: Request, res: Response){
        const {id} = req.params;
        try {
            const centroCusto = await centroCustoRepository.findOneBy({id: Number(id)});
            if(!centroCusto) return res.status(404).json({message: 'Centro de Custo não existe'});

            centroCustoRepository.merge(centroCusto, req.body);
            const editCentroCusto = await centroCustoRepository.save(centroCusto);

            return res.status(201).json(editCentroCusto);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
}