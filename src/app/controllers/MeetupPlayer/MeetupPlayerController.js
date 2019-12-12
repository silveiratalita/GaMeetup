import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
import Player from '../../models/Player';
import MeetupPlayer from '../../models/MeetupPlayer';
import * as yup from 'yup';
import dayjs from 'dayjs';
class MeetupPlayerController {
  async invitePlayerToMeetup(req, res) {
    const { playerId, meetupId, gameId } = req.params;
    console.log(req.params);
    try {
      if (
        playerId !== undefined &&
        meetupId !== undefined &&
        gameId !== undefined
      ) {
        const gameExists = await Game.findOne({ where: { id: gameId } });
        const playerExists = await Player.findOne({ where: { id: playerId } });
        const meetupExists = await Meetup.findOne({ where: { id: meetupId } });

        if (
          gameExists !== undefined &&
          playerExists !== undefined &&
          meetupExists !== undefined
        ) {
          const meetupPlayer = {
            playerId: playerExists.id,
            meetupId: meetupExists.id,
          };
          const invitedAcepted = await MeetupPlayer.create(meetupPlayer);
          return res.send(invitedAcepted);
        }
        return res.json({
          error:
            'Game, player or meetup dont exist  are wrong, please try again',
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}
export default new MeetupPlayerController();
