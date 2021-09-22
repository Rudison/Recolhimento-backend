import empresasRouter from '@modules/routes/empresas/empresas.routes';
import ncmsRouter from '@modules/routes/ncms/ncms.routes';
import usuariosRouter from '@modules/routes/usuarios/usuarios.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/empresas', empresasRouter);
routes.use('/ncms', ncmsRouter);
routes.use('/usuarios', usuariosRouter);

export default routes;
