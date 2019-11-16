import Game from '../../models/Game';
import * as yup from 'yup';

class GameController {
  async store(req, res) {
    console.log(req.body);
    try {
      const { type, name } = req.body;
      const yup = require('yup');
      const schema = yup.object().shape({
        name: yup.string().required(),
        type: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Fail' });
      }

      const gameExists = await Game.findOne({ where: { name: req.body.name } });

      if (!gameExists) {
        return res
          .status(400)
          .json({ error: 'Game already registered' }, gameExists);
      }
      const gameCreated = await Game.create(req.
        body);
      return res.jsons(gameCreated);
    } catch(err){
      console.error(err);
    }
  }

}
export default new  GameController;
