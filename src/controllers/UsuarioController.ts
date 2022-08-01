import { Request, Response } from 'express';
import { departamentoRepository } from '../repositories/departamentoRepository';
import { usuarioRepository } from '../repositories/usuarioRepository';
import { Usuario } from '../entities/Usuario';

export class UsuarioController{
    async create(req: Request, res: Response){
        const {nome, email, telefone, cargo, departamento_id} = req.body;

        try {
            const departamento = await departamentoRepository.findOneBy({id: Number(departamento_id)});
            if(!departamento) return res.status(404).json({message: 'Departamento não existe'});
            const newUsuario = usuarioRepository.create({
                nome, 
                email,
                telefone,
                cargo,
                departamento
            });

            await usuarioRepository.save(newUsuario);

            return res.status(201).json(newUsuario);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async list(req: Request, res: Response){
        try {
            const usuarios = await usuarioRepository.find({
                relations: {
                    departamento: true
                }
            });

            return res.status(201).json(usuarios);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async listDepartamento(req: Request, res: Response){
        const {id} = req.params;
        try {
            const list = await usuarioRepository.find({
                where: {
                    departamento: {
                        id: Number(id)
                    }
                },
                relations: {
                    departamento: true
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
            const usuario = await usuarioRepository.find({
                where: {
                    id: Number(id)
                }
            });

            await usuarioRepository.remove(usuario);

            return res.status(200).json(usuario);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async edit(req: Request, res: Response){
        const {departamento_id} = req.body;
        const {id} = req.params;
        try {
            const departamento = await departamentoRepository.findOneBy({id: Number(departamento_id)});
            if(!departamento) return res.status(404).json({message: 'Departamento não existe'});

            const user = await usuarioRepository.findOneBy({id: Number(id)});
            if(!user) return res.status(404).json({message: 'Usuário não existe'});

            usuarioRepository.merge(user, req.body);
            const editUsuario = await usuarioRepository.save(user);

            return res.status(201).json(editUsuario);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }


}