import Ncms from '@modules/typeorm/entities/Ncms';
import { NcmRepository } from '@modules/typeorm/repositories/NcmRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
  empresaId: string;
}

class ShowNcmService {
  public async execute({ id, empresaId }: IRequest): Promise<Ncms> {
    //
    const conn = getConnection();
    const ncmRepository = conn.getCustomRepository(NcmRepository);

    const ncm = await ncmRepository.findById(id, empresaId);

    if (!ncm) throw new AppError('Ncm Não Encontrado!');

    return ncm;
  }
}
export default ShowNcmService;
