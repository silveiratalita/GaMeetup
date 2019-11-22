import { Router } from 'express';
import GameController from './app/controllers/GameController/GameController';

const routes = new Router();

routes.post("/games", GameController.store);
routes.patch("/games/:id", GameController.updateGame);
routes.delete('/games/:id', GameController.deleteGame);
routes.get('/games/', GameController.searchGames);
export default routes;
