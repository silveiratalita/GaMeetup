import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
import Player from '../../models/Player';
import MeetupPlayer from '../../models/MeetupPlayer';
import * as yup from 'yup';
import dayjs from 'dayjs';

class MeetupController {
  async createMeetup(req, res) {
    const { gameId } = req.params;
    const { date, name } = req.body;

    const dayjs = require('dayjs');
    let dateToFormat = dayjs(date);
    req.body.date = dateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');

    const meetup = {
      name,
      date,
      gameId,
    };

    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string().required(),
      date: yup.date().required(),
      gameId: yup.number().required(),
    });

    if (!(await schema.isValid(meetup))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }

    try {
      const gameExists = await Game.findOne({ where: { id: gameId } });
      if (gameExists) {

        const meetupCreated = await Meetup.create(meetup);
        return res.send(meetupCreated);
      }
      return res.json({ error: 'Game Not Found' });

    } catch (err) {
      console.error(err);
    }
  }

  async invitePlayerToMeetup(req, res) {
  //invite/player/:playerId/meetup/:meetupId/game/:gameId
    const { playerId, meetupId, gameId } = req.params;
    try {
      if (playerId !== undefined && meetupId !== undefined && gameId !== undefined) {
        const gameExists = await Game.findOne({ where: { id: gameId } });
        const playerExists = await Player.findOne({ where: { id: playerId } });
        const meetupExists = await Meetup.findOne({ where: { id: meetupId } });

        if (gameExists !== undefined && playerExists !== undefined && meetupExists !== undefined) {
          const meetupPlayer = {
            playerId: playerExists.id,
            meetupId: meetupExists.id,
          };
          const invitedAcepted = await MeetupPlayer.create(meetupCreated);
          return res.send(invitedAcepted);
        }
        return res.json({ error: 'Game, player or meetup dont exist  are wrong, please try again' });
      }
    } catch (err) {
      console.error(err);
    }

}


}
export default new MeetupController();
