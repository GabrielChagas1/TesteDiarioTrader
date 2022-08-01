import { Request, Response } from "express";
import { usuarioRepository } from '../repositories/usuarioRepository';
import { departamentoRepository } from '../repositories/departamentoRepository';

export class UsuarioFrontController{
    async usuarios(req: Request, res: Response){
        const usuarios = await usuarioRepository.find({order:{id : "ASC"}, relations: { departamento: true } });
        const message = req.flash('message');
        const messageError = req.flash('messageError');
        res.render('usuarios/usuarios', {usuarios, message, messageError});
    }

    async usuariosForm(req: Request, res: Response){
        const departamentos = await departamentoRepository.find({order:{id : "ASC"} });
        res.render('usuarios/usuariosNew', {departamentos});
    }

    async create(req: Request, res: Response){  
        const {nome, email, cargo, telefone, departamento} = req.body;
        try {
            const departamentoValues = await departamentoRepository.findOneBy({id: Number(departamento)});
            // verificar o centro custo
            if(!departamentoValues){
                req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
                return res.redirect('/centroCustos');
            }
            const newDepartamento = usuarioRepository.create({
                nome, 
                email,
                cargo,
                telefone,
                departamento
            });

            await usuarioRepository.save(newDepartamento);
            req.flash('message', 'Criado com sucesso!')
            res.redirect('/usuarios');
        } catch (error) {
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            res.redirect('/usuarios');
        }
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;
        try {
            const deleteCentroCusto = await usuarioRepository.find({
                where: {
                    id: Number(id)
                }
            });

            await usuarioRepository.remove(deleteCentroCusto);
            req.flash('message', 'Removido com sucesso!')
            res.redirect('/usuarios');
        } catch (error) {
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            res.redirect('/usuarios');
        }
    }

    async editForm(req: Request, res: Response){
        const {id} = req.params; 
        const usuario = await usuarioRepository.find({where: { id: Number(id)}, relations:{ departamento: true}});
        const departamentos = await departamentoRepository.find({order:{id : "ASC"} });
        res.render('usuarios/usuariosEdit', {departamentos, usuario});
    }

    async edit(req: Request, res: Response){
        const {id} = req.params;
       try {
        const usuario = await usuarioRepository.findOneBy({id: Number(id)});
        //verificar o centro custo
        if(!usuario){
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            return res.redirect('/usuarios');
        }
        usuarioRepository.merge(usuario, req.body);
        await usuarioRepository.save(usuario);
        req.flash('message', 'Editado com sucesso!')
        res.redirect('/usuarios');
       } catch (error) {
        req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
        res.redirect('/usuarios');
       }
    }
}