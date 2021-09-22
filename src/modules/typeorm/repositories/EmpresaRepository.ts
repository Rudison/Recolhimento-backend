import { EntityRepository, Repository } from 'typeorm';
import Empresas from '../entities/Empresas';

@EntityRepository(Empresas)
export class EmpresaRepository extends Repository<Empresas> {
  //
  public async findById(id: string): Promise<Empresas | undefined> {
    const empresa = this.findOne({
      where: { id }
    });

    return empresa;
  }

  public async findAll(): Promise<Empresas[]> {
    const empresa = this.find();

    return empresa;
  }

  public async findByCnpj(cnpj: string): Promise<Empresas | undefined> {
    const empresa = this.findOne({ where: { cnpj } });

    return empresa;
  }
}
