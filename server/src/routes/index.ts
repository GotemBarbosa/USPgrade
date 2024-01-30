import {Router} from 'express';
import subjectRouter from './subject.routes';

const routes = Router();

routes.use('/subjects', subjectRouter);

export default routes;