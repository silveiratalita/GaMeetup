import Player from '../../models/Player.js';
import Mail from '../../../lib/mail';

class PlayerController {
  schemePlayerValidation = async (playerReqBody) => {
    const yup = require('yup');
    const schema = yup.object().shape(
      {
        name: yup.string(),
        name: yup.string().required(),
        email: yup.string().required(),
        cellphone: yup.string().required(),
      },
      ['name', 'email', 'cellphone']
    );
    let player;
    try {
      meetupValidate = await schema.validate(playerReqBody, {
        strict: true,
        abortEarly: false,
      });
    } catch (err) {
      const errObj = {
        error: err.name,
      };

      if (err.name === 'ValidationError') {
        errObj.errors = err.errors;
      }
      return errObj;
    }
  };
   createPlayer=async(req, res) =>{
    const { name, email,cellphone } = req.body;

     const playerValidate = await this.schemePlayerValidation(req.body);
    try {
      const playerExists = await Player.findOne({ where: { email } });
      if (playerExists) {
        res.json({ error: 'Player already exists!' });
      }
      const playerCreated = await Player.create(req.body);
      return res.send(playerCreated);
    } catch (err) {
      console.log(err);
    }
  }
}
export default new PlayerController();
