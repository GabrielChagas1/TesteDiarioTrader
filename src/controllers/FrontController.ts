import { Request, Response } from 'express';
import { centroCustoRepository } from '../repositories/centroCustoRepository';
import { departamentoRepository } from '../repositories/departamentoRepository';
import { usuarioRepository } from '../repositories/usuarioRepository';


export class FrontController{
    async index(req: Request, res: Response){
        const countUsuarios = await usuarioRepository.count();
        const countDepartamentos = await departamentoRepository.count();
        const countCentroCustos = await centroCustoRepository.count();
        const usuarios = await usuarioRepository.find({
            relations: {
                departamento: true
            }
        }); 
        res.render('index', {countUsuarios, countDepartamentos, countCentroCustos, usuarios});
    }

    async usuarios(req: Request, res: Response){
        const usuarios = await usuarioRepository.find({
            relations: {
                departamento: true
            }
        });

        res.render('usuarios/usuarios', {usuarios});
    }

    async usuariosEdit(req: Request, res: Response){
        const {id} = req.params;
        console.log(id)
        const usuario = await usuarioRepository.findOne({
            where: {id: Number(id)},
            relations: {
                departamento: true
            }
        });
        console.log(usuario)
        const departamentos = await departamentoRepository.find();
        res.render('usuarios/usuariosEdit', {usuario, departamentos})
    }

    async usuariosDelete(req: Request, res: Response){
        res.render('usuarios/usuariosDelete')
    }

    async departamentos(req: Request, res: Response){

        res.render('departamentos');
    }

}