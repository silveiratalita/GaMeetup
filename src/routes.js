import { Router } from 'express';
import GameController from './app/controllers/GameController/GameController';
import MeetupController from './app/controllers/MeetupController/MeetupController';
import Player from './app/models/Player.js';
import PlayerController from './app/controllers/PlayerController/PlayerController.js';
import MeetupPlayer from './app/models/MeetupPlayer';
import MeetupPlayerController from './app/controllers/MeetupPlayer/MeetupPlayerController';
const routes = new Router();

routes.post("/games", GameController.store);
routes.patch("/games/:id", GameController.updateGame);
routes.delete('/games/:id', GameController.deleteGame);
routes.get('/games/', GameController.searchGames);

routes.post('/games/:gameId/meetup', MeetupController.createMeetup);
routes.post('/players', PlayerController.createPlayer);
routes.post('/invite/player/:playerId/meetup/:meetupId/game/:gameId', MeetupPlayerController.invitePlayerToMeetup);

export default routes;
