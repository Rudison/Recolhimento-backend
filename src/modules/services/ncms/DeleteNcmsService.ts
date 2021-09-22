import { NcmRepository } from '@modules/typeorm/repositories/NcmRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteNcmService {
  public async execute({ id }: IRequest): Promise<void> {
    const conn = getConnection();
    const ncmRepository = conn.getCustomRepository(NcmRepository);

    const ncm = await ncmRepository.findOne(id);

    if (!ncm) throw new AppError('Ncm Não Encontrado!');

    await ncmRepository.remove(ncm);
  }
}
export default DeleteNcmService;
