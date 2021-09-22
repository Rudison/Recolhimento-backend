import Ncms from '@modules/typeorm/entities/Ncms';
import { NcmRepository } from '@modules/typeorm/repositories/NcmRepository';
import AppError from '@shared/errors/AppError';
import { getConnection } from 'typeorm';

interface IRequest {
  empresaId: number;
  descricao: string;
  numeroNcm: string;
  cest: string;
  mva: number;
}
class CreateNcmsService {
  public async execute({
    empresaId,
    descricao,
    numeroNcm,
    cest,
    mva
  }: IRequest): Promise<Ncms> {
    //
    const conn = getConnection();
    const ncmRepository = conn.getCustomRepository(NcmRepository);
    const ncmPorEmpresaExiste = await ncmRepository.findById(
      empresaId.toString(),
      numeroNcm
    );

    if (ncmPorEmpresaExiste) throw new AppError('Ncm já Cadastrado!');

    const ncm = ncmRepository.create({
      empresaId,
      descricao,
      numeroNcm,
      cest,
      mva
    });

    await ncmRepository.save(ncm);

    return ncm;
  }
}
export default CreateNcmsService;
