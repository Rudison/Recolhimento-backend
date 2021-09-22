import Ncms from '@modules/typeorm/entities/Ncms';
import { NcmRepository } from '@modules/typeorm/repositories/NcmRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  id: string;
  empresaId: number;
  descricao: string;
  numeroNcm: string;
  cest: string;
  mva: number;
}

class UpdateNcmService {
  public async execute({
    id,
    empresaId,
    descricao,
    numeroNcm,
    cest,
    mva
  }: IRequest): Promise<Ncms> {
    //
    const conn = getConnection();
    const ncmRepository = conn.getCustomRepository(NcmRepository);

    const ncm = await ncmRepository.findOne(id);

    if (!ncm) throw new AppError('Ncm Não Encontrado!');

    const ncmJaExiste = await ncmRepository.findById(
      empresaId.toString(),
      numeroNcm
    );

    if (ncmJaExiste?.id != ncm.id)
      if (ncmJaExiste) throw new AppError('Ncm Já Cadastrado!');

    ncm.empresaId = empresaId;
    ncm.descricao = descricao;
    ncm.numeroNcm = numeroNcm;
    ncm.cest = cest;
    ncm.mva = mva;

    await ncmRepository.save(ncm);

    return ncm;
  }
}
export default UpdateNcmService;
