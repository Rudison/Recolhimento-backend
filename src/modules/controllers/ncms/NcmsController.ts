import CreateNcmsService from '@modules/services/ncms/CreateNcmsService';
import DeleteNcmService from '@modules/services/ncms/DeleteNcmsService';
import ListNcmService from '@modules/services/ncms/ListNcmsService';
import ShowNcmService from '@modules/services/ncms/ShowNcmsService';
import UpdateNcmService from '@modules/services/ncms/UpdateNcmsService';
import { Request, Response } from 'express';

export default class NcmsController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listNcms = new ListNcmService();
    const ncm = await listNcms.execute();

    return response.json(ncm);
  }

  public async getById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id, empresaId } = request.params;

    const ncms = new ShowNcmService();
    const empresa = await ncms.execute({ id, empresaId });

    return response.json(empresa);
  }

  public async getByCompany(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { empresaId } = request.params;
    const ncms = new ListNcmService();
    const empresa = await ncms.getByCompany({ empresaId });

    return response.json(empresa);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { empresaId, descricao, numeroNcm, cest, mva } = request.body;

    const createNcm = new CreateNcmsService();

    const ncm = await createNcm.execute({
      empresaId,
      descricao,
      numeroNcm,
      cest,
      mva
    });

    return response.json(ncm);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { empresaId, descricao, numeroNcm, cest, mva } = request.body;

    const updateEmpresa = new UpdateNcmService();

    const empresa = await updateEmpresa.execute({
      id,
      empresaId,
      descricao,
      numeroNcm,
      cest,
      mva
    });

    return response.json(empresa);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteEmpresa = new DeleteNcmService();
    await deleteEmpresa.execute({ id });

    return response.json([]);
  }
}
