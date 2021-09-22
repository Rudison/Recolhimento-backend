import { EmpresaRepository } from '@modules/typeorm/repositories/EmpresaRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteEmpresaService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection();
    const empresaRepository = conn.getCustomRepository(EmpresaRepository);

    const empresa = await empresaRepository.findOne(id);

    if (!empresa) throw new AppError('Empresa Não Encontrada!');

    await empresaRepository.remove(empresa);
  }
}
export default DeleteEmpresaService;
