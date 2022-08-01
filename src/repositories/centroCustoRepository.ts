import { AppDataSource } from '../data-source';
import { CentroCusto } from '../entities/CentroCusto';

export const centroCustoRepository = AppDataSource.getRepository(CentroCusto)