import * as yup from 'yup';
import Player from '../../models/Player';

class PlayerController{
  async createPlayer(req,res) {
    const { name, email } = req.body;

    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
    });
    if (!(await schema.isValid(meetup))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }
    try {
      const playerExists = await Player.findOne({ where: { email } });
      if (playerExists) {
        res.json({error: "Player already exists!"});
      }
      const playerCreated = await Player.create(req.body);
      return res.send(playerCreated);
    } catch (err) {
      console.log(err);
    }
  }
}
export default new PlayerController();
