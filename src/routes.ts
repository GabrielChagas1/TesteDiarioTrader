import {Router} from 'express'
import { CentroCustoController } from './controllers/CentroCustoController';
import { CentroCustoFrontController } from './controllers/CentroCustoFrontController';
import { DepartamentoController } from './controllers/DepartamentoController';
import { DepartamentoFrontController } from './controllers/DepartamentoFrontController';
import { FrontController } from './controllers/FrontController';
import { UsuarioController } from './controllers/UsuarioController';
import { UsuarioFrontController } from './controllers/UsuarioFrontController';

const routes = Router();

// criando rotas centro custo
routes.post('/centroCusto', new CentroCustoController().create);
routes.get('/listarCentrosCusto', new CentroCustoController().list);
routes.delete('/centroCusto/:id', new CentroCustoController().delete);
routes.put('/centroCusto/:id', new CentroCustoController().edit);

// criando rotas departamentos
routes.post('/departamento', new DepartamentoController().create);
routes.get('/listarDepartamentos', new DepartamentoController().list);
routes.get('/listarDepartamentoCentroCusto/:id', new DepartamentoController().listCentroCusto);
routes.delete('/departamento/:id', new DepartamentoController().delete);
routes.put('/departamento/:id', new DepartamentoController().edit);

// criando rotas usuarios
routes.post('/usuario', new UsuarioController().create);
routes.get('/listarUsuarios', new UsuarioController().list);
routes.get('/listarUsuariosDepartamento/:id', new UsuarioController().listDepartamento);
routes.put('/usuario/:id', new UsuarioController().edit);

routes.get('/', new FrontController().index);

// routes usuarios Front
routes.get('/usuarios', new UsuarioFrontController().usuarios);
routes.get('/usuarios/add', new UsuarioFrontController().usuariosForm);
routes.post('/usuarios/add', new UsuarioFrontController().create);
routes.get('/usuarios/delete/:id', new UsuarioFrontController().delete);
routes.get('/usuarios/edit/:id', new UsuarioFrontController().editForm);
routes.post('/usuarios/edit/:id', new UsuarioFrontController().edit);

// routes departamentos Front
routes.get('/departamentos', new DepartamentoFrontController().departamentos);
routes.get('/departamentos/add', new DepartamentoFrontController().departamentosForm);
routes.post('/departamentos/add', new DepartamentoFrontController().create);
routes.get('/departamentos/delete/:id', new DepartamentoFrontController().delete);
routes.get('/departamentos/edit/:id', new DepartamentoFrontController().editForm);
routes.post('/departamentos/edit/:id', new DepartamentoFrontController().edit);


// routes centroCustos Front
routes.get('/centroCustos', new CentroCustoFrontController().centroCustos);
routes.get('/centroCustos/add', new CentroCustoFrontController().centroCustosForm);
routes.post('/centroCustos/add', new CentroCustoFrontController().create);
routes.get('/centroCustos/delete/:id', new CentroCustoFrontController().delete);
routes.get('/centroCustos/edit/:id', new CentroCustoFrontController().editForm);
routes.post('/centroCustos/edit/:id', new CentroCustoFrontController().edit);


export default routes