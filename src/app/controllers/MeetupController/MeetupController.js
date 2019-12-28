import * as yup from 'yup';
import dayjs from 'dayjs';
import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
import Player from '../../models/Player';
import MeetupPlayer from '../../models/MeetupPlayer';

class MeetupController {
  async createMeetup(req, res) {
    const { gameId } = req.params;
    const { startDate, endDate, name } = req.body;

    const dayjs = require('dayjs');

    const startDateToFormat = dayjs(startDate, 'America/Sao_Paulo');
    const endDateToFormat = dayjs(endDate, 'America/Sao_Paulo');
    req.body.startDate = startDateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');
    req.body.endDate = endDateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');

    // const hour = dateToFormat.get('hour');
    // const minute = dateToFormat.get('minute');

    const meetup = {
      name,
      startDate,
      endDate,
      gameId,
    };

    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string().required(),
      startDate: yup.date().required(),
      endDate: yup.date().required(),
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
    const { startDate, endDate, isCanceled } = req.body;
    const { meetupId } = req.params;

    const dayjs = require('dayjs');
    const startDateToFormat = dayjs(startDate, 'America/Sao_Paulo');
    const endDateToFormat = dayjs(startDate, 'America/Sao_Paulo');
    req.body.startDate = startDateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');
    req.body.endDate = endDateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');

    const meetupToChange = {
      isCanceled,
      startDate,
      endDate,
    };

    const yup = require('yup');
    const schema = yup.object().shape({
      isCanceled: yup.boolean(),
      startDate: yup.date().required(),
      endDate: yup.date().required(),
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

        return res.json({ error: 'error in update meetup!' });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default new MeetupController();
