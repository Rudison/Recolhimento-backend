import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import NcmsController from '@modules/controllers/ncms/NcmsController';

const ncmsRouter = Router();
const ncmsController = new NcmsController();

ncmsRouter.get('/', ncmsController.index);

ncmsRouter.get(
  '/getById/:id/:empresaId',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
      empresaId: Joi.string().required()
    }
  }),
  ncmsController.getById
);

ncmsRouter.get(
  '/getByCompany/:empresaId',
  celebrate({
    [Segments.PARAMS]: {
      empresaId: Joi.string().required()
    }
  }),
  ncmsController.getByCompany
);

ncmsRouter.get(
  '/getByCnpj/:cnpj',
  celebrate({
    [Segments.PARAMS]: {
      cnpj: Joi.string().required()
    }
  }),
  ncmsController.getByCnpj
);

ncmsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      empresaId: Joi.number().required(),
      descricao: Joi.string().required(),
      numeroNcm: Joi.string().required(),
      cest: Joi.string().required(),
      mva: Joi.number().required()
    }
  }),
  ncmsController.create
);

ncmsRouter.put(
  '/update/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    },
    [Segments.BODY]: {
      empresaId: Joi.number().required(),
      descricao: Joi.string().required(),
      numeroNcm: Joi.string().required(),
      cest: Joi.string().required(),
      mva: Joi.number().required()
    }
  }),
  ncmsController.update
);

ncmsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() }
  }),
  ncmsController.delete
);
export default ncmsRouter;
