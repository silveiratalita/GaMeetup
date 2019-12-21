import * as yup from 'yup';
import dayjs from 'dayjs';
import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
import Player from '../../models/Player';
import MeetupPlayer from '../../models/MeetupPlayer';

class MeetupController {
  async createMeetup(req, res) {
    const { gameId } = req.params;
    const { date, name } = req.body;

    const dayjs = require('dayjs');

    const dateToFormat = dayjs(date, 'America/Sao_Paulo');
    req.body.date = dateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');

    // const hour = dateToFormat.get('hour');
    // const minute = dateToFormat.get('minute');

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
      const gameExists = await Game.findOne({
        where: { id: gameId },
      });
      if (gameExists) {
        const meetupCreated = await Meetup.create(meetup);
        return res.send(meetupCreated);
      }
      return res.json({ error: 'Game Not Found' });
    } catch (err) {
      console.error(err);
    }
  }

  async updateMeetup(req, res) {
    const { date, isCanceled } = req.body;
    const { meetupId } = req.params;

    const dayjs = require('dayjs');
    const dateToFormat = dayjs(date, 'America/Sao_Paulo');
    req.body.date = dateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');

    const meetupToChange = {
      isCanceled,
      date,
    };

    const yup = require('yup');
    const schema = yup.object().shape({
      isCanceled: yup.boolean(),
      date: yup.date().required(),
    });

    if (!(await schema.isValid(meetupToChange))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }
    try {
      const meetupExists = await Meetup.findOne({ where: { id: meetupId } });
      if (meetupExists) {
        const meetupChange = await Meetup.update(meetupToChange, {
          where: { id: meetupId },
        });
        if (meetupChange !== undefined) {
          const returnChanged = await Meetup.findOne({
            where: { id: meetupId },
          });
          return res.send(returnChanged);
        }

        return res.json({ error: 'error now' });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default new MeetupController();
