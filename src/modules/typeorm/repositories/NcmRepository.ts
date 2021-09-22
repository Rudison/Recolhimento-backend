import { EntityRepository, Repository } from 'typeorm';
import Ncms from '../entities/Ncms';

@EntityRepository(Ncms)
export class NcmRepository extends Repository<Ncms> {
  //
  public async findById(
    id: string,
    empresaId: string
  ): Promise<Ncms | undefined> {
    const ncm = this.findOne({
      where: { id, empresaId }
    });

    return ncm;
  }

  public async findAllByCompany(
    empresaId: string
  ): Promise<Ncms[] | undefined> {
    const ncm = this.find({ where: empresaId });

    return ncm;
  }
}
