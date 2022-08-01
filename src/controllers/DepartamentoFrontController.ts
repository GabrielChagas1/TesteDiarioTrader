import { Request, Response } from "express";
import { departamentoRepository } from '../repositories/departamentoRepository';
import { centroCustoRepository } from '../repositories/centroCustoRepository';

export class DepartamentoFrontController{
    async departamentos(req: Request, res: Response){
        const departamentos = await departamentoRepository.find({order:{id : "ASC"}, relations: { centroCusto: true } });
        const message = req.flash('message');
        const messageError = req.flash('messageError');
        res.render('departamentos/departamentos', {departamentos, message, messageError});
    }

    async departamentosForm(req: Request, res: Response){
        const centroCustos = await centroCustoRepository.find({order:{id : "ASC"} });
        res.render('departamentos/departamentosNew', {centroCustos});
    }

    async create(req: Request, res: Response){  
        const {nome, descricao, centroCusto} = req.body;
        try {
            const centroCustoValues = await centroCustoRepository.findOneBy({id: Number(centroCusto)});
            // verificar o centro custo
            if(!centroCustoValues){
                req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
                return res.redirect('/centroCustos');
            }
            const newDepartamento = departamentoRepository.create({
                nome, 
                descricao,
                centroCusto
            });

            await departamentoRepository.save(newDepartamento);
            req.flash('message', 'Criado com sucesso!')
            res.redirect('/departamentos');
        } catch (error) {
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            res.redirect('/departamentos');
        }
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;
        try {
            const deleteCentroCusto = await departamentoRepository.find({
                where: {
                    id: Number(id)
                }
            });

            await departamentoRepository.remove(deleteCentroCusto);
            req.flash('message', 'Removido com sucesso!')
            res.redirect('/departamentos');
        } catch (error) {
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            res.redirect('/departamentos');
        }
    }

    async editForm(req: Request, res: Response){
        const {id} = req.params; 
        const departamento = await departamentoRepository.find({where: { id: Number(id)}, relations:{ centroCusto: true}});
        const centroCustos = await centroCustoRepository.find({order:{id : "ASC"} });
        res.render('departamentos/departamentosEdit', {departamento, centroCustos});
    }

    async edit(req: Request, res: Response){
        const {id} = req.params;
       try {
        const departamento = await departamentoRepository.findOneBy({id: Number(id)});
        // verificar o centro custo
        if(!departamento){
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            return res.redirect('/departamentos');
        }
        departamentoRepository.merge(departamento, req.body);
        await departamentoRepository.save(departamento);
        req.flash('message', 'Editado com sucesso!')
        res.redirect('/departamentos');
       } catch (error) {
        req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
        res.redirect('/departamentos');
       }
    }
}