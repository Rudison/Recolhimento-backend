import CreateEmpresaService from '@modules/services/empresas/CreateEmpresaService';
import DeleteEmpresaService from '@modules/services/empresas/DeleteEmpresaService';
import ListEmpresaService from '@modules/services/empresas/ListEmpresaService';
import ShowEmpresaService from '@modules/services/empresas/ShowEmpresaService';
import UpdateEmpresaService from '@modules/services/empresas/UpdateEmpresaService';
import { Request, Response } from 'express';

export default class EmpresasController {
  //
  public async index(request: Request, response: Response): Promise<Response> {
    const listEmpresas = new ListEmpresaService();
    const empresa = await listEmpresas.execute();

    return response.json(empresa);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEmpresa = new ShowEmpresaService();
    const empresa = await showEmpresa.execute({ id });

    return response.json(empresa);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { descricao, cnpj, email } = request.body;

    const createEmpresa = new CreateEmpresaService();

    const empresa = await createEmpresa.execute({
      descricao,
      cnpj,
      email
    });

    return response.json(empresa);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { descricao, cnpj, email } = request.body;

    const updateEmpresa = new UpdateEmpresaService();

    const empresa = await updateEmpresa.execute({ id, descricao, cnpj, email });

    return response.json(empresa);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteEmpresa = new DeleteEmpresaService();
    await deleteEmpresa.execute({ id });

    return response.json([]);
  }
}
