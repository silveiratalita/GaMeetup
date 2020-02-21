import Player from '../../models/Player.js';
import Mail from '../../../lib/mail';
import dbErrorTranslate from '../../../lib/dbErrorTranslate';

class PlayerController {
   createPlayer=async(req, res) =>{
    const { name, email,cellphone } = req.body;
    try {
      const playerCreated = await Player.create(req.body);
      return res.send(playerCreated);
    } catch (err) {

       return res.send(dbErrorTranslate(err.parent));
    }
  }
}
export default new PlayerController();
