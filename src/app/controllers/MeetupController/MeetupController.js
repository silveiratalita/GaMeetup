import Meetup from '../../models/MeetUp';
import Game from '../../models/Game';
import * as yup from 'yup';

class MeetupController {
    async createMeetup(req, res) {
        const { gameId } = req.params;
        const { date, name } = req.body;
        console.log("1gameid", gameId)

        const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string().required(),
            date: yup.date().required(),
            gameId: yup.number().required(),
        });

        if (!(await schema.isValid(req.body, req.params))) {
            return res.status(400).json({ error: 'Validation Fail' });
        }
        console.log("funcionou a validacao");
        const gameExists = await Game.findOne({ where: { id: gameId } });
        if (gameExists) {
            return res.send(gameExists);
        }
        return res.json({ error: "Game Not Found" });

    }
}
export default new MeetupController;