import { Sequelize } from 'sequelize';
import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
import Player from '../../models/Player';
import MeetupPlayer from '../../models/MeetupPlayer';
import Mail from '../../../lib/mail';

const { Op } = Sequelize;

class MeetupPlayerController {
  async invitePlayerToMeetup(req, res) {
    const { playerId, meetupId, gameId } = req.params;
    try {
      if (
        playerId == undefined ||
        meetupId == undefined ||
        gameId == undefined
      ) {
        res.json({ error: 'The parameters can not be null' });
      }
      const gameExists = await Game.findOne({ where: { id: gameId } });
      const playerExists = await Player.findOne({ where: { id: playerId } });
      const meetupExists = await Meetup.findOne({ where: { id: meetupId } });

      if (!gameExists || !playerExists || !meetupExists) {
        res.json({ error: 'Game, player or meetup dont exists, try again!' });
      }

      const alreadyinvited = await MeetupPlayer.findAll({
        where: {
          playerId,
          meetupId,
        },
      });
      // eslint-disable-next-line no-cond-assign

      if (
        alreadyinvited[0] !== undefined &&
        alreadyinvited[0].playerId == playerId &&
        alreadyinvited[0].meetupId == meetupId
      ) {
        return res.json({ error: 'Invite already accepted!' });
      }
      const meetupPlayer = {
        playerId: playerExists.id,
        meetupId: meetupExists.id,
      };

      const dateConflict = await MeetupPlayer.findOne({
        where: {
          playerId: playerExists.id,
          [Op.or] : [
            {
              '$Meetup.start_date$': {
                [Op.between]: [meetupExists.startDate,
                 meetupExists.endDate],
              },
            },
            {
              '$Meetup.end_date$': {
                [Op.between]: [meetupExists.startDate,
                 meetupExists.endDate],
              },
            },
          ],
        },
        include: [
          {
            model: Meetup,
          },
        ],
      });

      console.log('dateConflict----------------------', dateConflict);

      // const invitedAcepted = await MeetupPlayer.create(meetupPlayer);

      // await Mail.sendMail({
      //   to: ` ${playerExists.name} <${playerExists.email}>`,
      //   subject: `Bem vindo ao meetup  ${meetupExists.name} `,
      //   text: `Você agora está participando do meetup  ${meetupExists.name} `,
      // });
      // return res.send(invitedAcepted);
      return res.send('ok');
    } catch (err) {
      console.error(err);
    }
  }
}
export default new MeetupPlayerController();
