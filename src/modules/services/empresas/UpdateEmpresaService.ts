import Empresas from '@modules/typeorm/entities/Empresas';
import { EmpresaRepository } from '@modules/typeorm/repositories/EmpresaRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
  descricao: string;
  cnpj: string;
  email: string;
}

class UpdateEmpresaService {
  public async execute({
    id,
    descricao,
    cnpj,
    email
  }: IRequest): Promise<Empresas> {
    //
    const conn = getConnection();
    const empresaRepository = conn.getCustomRepository(EmpresaRepository);

    const empresa = await empresaRepository.findOne(id);

    if (!empresa) throw new AppError('Empresa Não Encontrada!');

    const empresaExiste = await empresaRepository.findByCnpj(cnpj);

    if (empresaExiste?.id != empresa.id)
      if (empresaExiste) throw new AppError('Empresa Já Cadastrada!');

    empresa.descricao = descricao;
    empresa.cnpj = cnpj;
    empresa.email = email;

    await empresaRepository.save(empresa);

    return empresa;
  }
}
export default UpdateEmpresaService;
