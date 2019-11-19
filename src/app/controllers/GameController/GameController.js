import Game from '../../models/Game';
import * as yup from 'yup';

class GameController {
  async store(req, res) {
    console.log(req.body);

    const { type, name } = req.body;
    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string().required(),
      type: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }
    try {
      if (name != undefined && type != undefined) {

        const gameExists = await Game.findByPk({ where: name });

        if (!gameExists) {
          return res.status(400).json({ error: 'Game already registered' });
        }
        const gameCreated = await Game.create(req.body);
        return res.json(gameCreated);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
 export default new GameController();
