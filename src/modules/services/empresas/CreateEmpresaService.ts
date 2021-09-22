import Empresas from '@modules/typeorm/entities/Empresas';
import { EmpresaRepository } from '@modules/typeorm/repositories/EmpresaRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  descricao: string;
  cnpj: string;
  email: string;
}
class CreateEmpresaService {
  public async execute({
    descricao,
    cnpj,
    email
  }: IRequest): Promise<Empresas> {
    //
    const conn = getConnection();
    const empresasRepository = conn.getCustomRepository(EmpresaRepository);
    const empresaJaExiste = await empresasRepository.findByCnpj(cnpj);

    if (empresaJaExiste) throw new AppError('Empresa já cadastrada!');

    const empresa = empresasRepository.create({
      descricao,
      cnpj,
      email
    });

    await empresasRepository.save(empresa);

    return empresa;
  }
}
export default CreateEmpresaService;
