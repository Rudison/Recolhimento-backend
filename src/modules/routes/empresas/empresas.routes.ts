import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import EmpresasController from '@modules/controllers/empresas/EmpresasController';

const empresaRouter = Router();
const empresaController = new EmpresasController();

empresaRouter.get('/', empresaController.index);

empresaRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  empresaController.show
);

empresaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      cnpj: Joi.string().required(),
      email: Joi.string().required()
    }
  }),
  empresaController.create
);

empresaRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      cnpj: Joi.string().required(),
      email: Joi.string().required()
    }
  }),
  empresaController.update
);

empresaRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  empresaController.delete
);

export default empresaRouter;
