import { Request, Response } from 'express';
import { centroCustoRepository } from '../repositories/centroCustoRepository';
import { CentroCusto } from '../entities/CentroCusto';
export class CentroCustoFrontController{
    async centroCustos(req: Request, res: Response){
        const centrosCustos = await centroCustoRepository.find({order:{id : "ASC"} });
        const message = req.flash('message');
        const messageError = req.flash('messageError');
        res.render('centroCustos/centroCustos', {centrosCustos, message, messageError});
    }

    async centroCustosForm(req: Request, res: Response){
        res.render('centroCustos/centroCustosNew');
    }

    async create(req: Request, res: Response){  
        const {nome, descricao} = req.body;
 
        try {
            const newCentroCusto = centroCustoRepository.create({nome, descricao});
            await centroCustoRepository.save(newCentroCusto);       
            const centrosCustos = await centroCustoRepository.find();
            req.flash('message', 'Criado com sucesso!')
            res.redirect('/centroCustos');
        } catch (error) {
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            res.redirect('/centroCustos');
        }
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;
        try {
            const deleteCentroCusto = await centroCustoRepository.find({
                where: {
                    id: Number(id)
                }
            });

            await centroCustoRepository.remove(deleteCentroCusto);
            req.flash('message', 'Removido com sucesso!')
            res.redirect('/centroCustos');
        } catch (error) {
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            res.redirect('/centroCustos');
        }
    }

    async editForm(req: Request, res: Response){
        const {id} = req.params; 
        const centroCustos = await centroCustoRepository.findOneBy({id: Number(id)});
        res.render('centroCustos/centroCustosEdit', {centroCustos});
    }

    async edit(req: Request, res: Response){
        const {id} = req.params;
       try {
        const CentroCusto = await centroCustoRepository.findOneBy({id: Number(id)});
        // verificar o centro custo
        if(!CentroCusto){
            req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
            return res.redirect('/centroCustos');
        }
        centroCustoRepository.merge(CentroCusto, req.body);
        await centroCustoRepository.save(CentroCusto);
        req.flash('message', 'Editado com sucesso!')
        res.redirect('/centroCustos');
       } catch (error) {
        req.flash('messageError', 'Desculpa não foi possivel completar essa ação!');
        res.redirect('/centroCustos');
       }
    }
}