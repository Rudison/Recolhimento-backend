import Empresas from '@modules/typeorm/entities/Empresas';
import { EmpresaRepository } from '@modules/typeorm/repositories/EmpresaRepository';
import { getConnection } from 'typeorm';

class ListEmpresaService {
  public async execute(): Promise<Empresas[]> {
    const conn = getConnection();

    const empresaRepository = conn.getCustomRepository(EmpresaRepository);

    const empresas = await empresaRepository.find();

    return empresas;
  }
}
export default ListEmpresaService;
