import { Router } from 'express';
import GameController from './app/controllers/GameController/GameController';

const routes = new Router();

routes.post("/games", GameController.store);

export default routes;
