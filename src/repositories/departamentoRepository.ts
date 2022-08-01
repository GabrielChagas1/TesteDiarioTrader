import { AppDataSource } from '../data-source';
import { Departamento } from '../entities/Departamento';

export const departamentoRepository = AppDataSource.getRepository(Departamento)