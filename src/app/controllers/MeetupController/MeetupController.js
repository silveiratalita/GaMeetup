import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
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

        const meetupCreated = await Meetup.create(req.body);
        return res.send(meetupCreated);
      }
      return res.json({ error: 'Game Not Found' });

    } catch (err) {
      console.error(err);
    }
  }




}
export default new MeetupController();
