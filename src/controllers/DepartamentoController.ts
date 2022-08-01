import { Request, Response } from "express";
import { centroCustoRepository } from "../repositories/centroCustoRepository";
import { departamentoRepository } from '../repositories/departamentoRepository';

export class DepartamentoController{
    async create(req: Request, res: Response){
        const {nome, descricao, centroCusto_id} = req.body;

        try {
            const centroCusto = await centroCustoRepository.findOneBy({ id: centroCusto_id});

            if(!centroCusto) return res.status(404).json({message: 'Centro de custo não existe'});

            const newDepartamento = departamentoRepository.create({
                nome,
                descricao,
                centroCusto
            });
            
            await departamentoRepository.save(newDepartamento);

            return res.status(201).json(newDepartamento);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'})
        }


    }

    async list(req: Request, res: Response){
        try {
            const departamentos = await departamentoRepository.find({
                relations: {
                    centroCusto: true
                }
            });

            return res.status(200).json(departamentos);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async listCentroCusto(req: Request, res: Response){
        const {id} = req.params;
        try {
            const list = await departamentoRepository.find({
                where: {
                    centroCusto: {
                        id: Number(id)
                    }
                },
                relations: {
                    centroCusto: true
                }
            });  
            return res.status(200).json(list);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;
        try {
            const departamento = await departamentoRepository.find({
                where: {
                    id: Number(id)
                }
            });

            await departamentoRepository.remove(departamento);

            return res.status(200).json(departamento);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async edit(req: Request, res: Response){
        const {centroCusto_id} = req.body;
        const {id} = req.params;
        try {
            const centroCusto = await centroCustoRepository.findOneBy({id: Number(centroCusto_id)});
            if(!centroCusto) return res.status(404).json({message: 'Centro de Custo não existe'});

            const departamento = await departamentoRepository.findOneBy({id: Number(id)});
            if(!departamento) return res.status(404).json({message: 'Departamento não existe'});

            departamentoRepository.merge(departamento, req.body);
            const editDepartamento = await departamentoRepository.save(departamento);

            return res.status(201).json(editDepartamento);
           

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
}