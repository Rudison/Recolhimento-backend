import Empresas from '@modules/typeorm/entities/Empresas';
import { EmpresaRepository } from '@modules/typeorm/repositories/EmpresaRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowEmpresaService {
  public async execute({ id }: IRequest): Promise<Empresas> {
    //
    const conn = getConnection();
    const empresaRepository = conn.getCustomRepository(EmpresaRepository);

    const empresa = await empresaRepository.findOne(id);

    if (!empresa) throw new AppError('Empresa Não Encontrada!');

    return empresa;
  }
}
export default ShowEmpresaService;
