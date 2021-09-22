import Ncms from '@modules/typeorm/entities/Ncms';
import { NcmRepository } from '@modules/typeorm/repositories/NcmRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  empresaId: string;
}

class ListNcmService {
  public async execute(): Promise<Ncms[] | undefined> {
    const conn = getConnection();

    const ncmRepository = conn.getCustomRepository(NcmRepository);

    const ncms = await ncmRepository.find();

    return ncms;
  }

  public async getByCompany({
    empresaId
  }: IRequest): Promise<Ncms[] | undefined> {
    //
    const conn = getConnection();
    const ncmRepository = conn.getCustomRepository(NcmRepository);

    const ncms = await ncmRepository
      .createQueryBuilder('a')
      .select('a.id as "id"')
      .addSelect('a."empresaId"')
      .addSelect('b."descricao" as empresa')
      .addSelect('a."descricao"')
      .addSelect('a."numeroNcm"')
      .addSelect('a."cest"')
      .addSelect('a."mva"')
      .innerJoin('Empresas', 'b', 'b.id = a."empresaId"')
      .where('a."empresaId" = :empresaId', { empresaId })
      .orderBy('a.descricao')
      .getRawMany();

    if (ncms == null) {
      throw new AppError('Nenhum Ncm Encontrado', 401);
    }

    return ncms;
  }
}
export default ListNcmService;
