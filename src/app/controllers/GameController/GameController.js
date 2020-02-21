import * as yup from 'yup';
import Game from '../../models/Game';
import Meetup from '../../models/Meetup';
import dbErrorTranslate from '../../../lib/dbErrorTranslate';

class GameController {
  // constructor(){
  //   this.schema = yup.object().shape(
  //     {
  //       name: yup.string().required(),
  //       type: yup.string().required(),
  //     },
  //     ['name', 'type']
  //   )
  // }
  // schemeGameValidation = async (gameReqBody) => {

  //   const yup = require('yup');

  //   let game;
  //   try {
  //     game = await this.schema.validate(gameReqBody, {
  //       strict: true,
  //       abortEarly: false,
  //     });
  //   } catch (err) {
  //     const errObj = {
  //       error: err.name,
  //     };

  //     if (err.name === 'ValidationError') {
  //       errObj.errors = err.errors;
  //     }
  //     return errObj;
  //   }
  // }

  store = async (req, res) => {
    // let err;

    // if ((err = await this.schemeGameValidation(req.body))) {
    //   console.log(err);
    //   return res.status(400).json(err);
    // }

    try {
      // const gameExists = await Game.findOne({
      //   where: { name: req.body.name },
      // });

      // if (gameExists) {
      //   return res.status(400).json({ error: 'Game already registered' });
      // }

      const gameCreated = await Game.create(req.body);

      return res.json(gameCreated);
    } catch (err) {
      console.log(err.parent);
      return res.send(dbErrorTranslate(err.parent));
    }
  }

   updateGame=async(req, res)=> {
    const { type, name } = req.body;
    // const gameValidation = this.schemeGameValidation(req.body);
    const { id } = req.params;
    try {
      // const gameRegistred = await Game.findOne({ where: { id } });
      // if (gameRegistred.name != name || gameRegistred.type != type) {
        const gameUpdated = await Game.update(req.body, {
          where: { id },
        });
        // return res.send(gameUpdated);
      // }
      if (gameUpdated === 0) {
        return res.json({ msg: 'No change in this game!' });
      }
      return res.json({ msg: 'Done!' });
    } catch (err) {
      return res.send(dbErrorTranslate(err.parent));
    }
  }

  async deleteGame(req, res) {
    const { id } = req.params;

    // const gameFound = await Game.findOne({ where: { id } });

    // if (!gameFound) {
    //   return res.send(json({ msg: 'Game Not Found' }));
    // }
    try {
      const gamesAssociateToMeetup = Meetup.findAll({ where: { gameId: gameFound.id } });
      if (gamesAssociateToMeetup !== undefined) {
        return res.json({ error: 'You cant delete this game becous it associated with a meetups.' });
      }
      const deletedGame = await Game.destroy({ where: { id } });
      return res.send(deletedGame);
    }
    catch (err) {
      return res.send(dbErrorTranslate(err.parent));
    }
  }

  async searchGames(req, res) {
    const games = req.body;
    const gamesFounded = [];
    if (games != undefined) {
      try {
        for (const game of games) {
          const gameFound = await Game.findOne({ where: { name: game.name } });

          if (gameFound != undefined) {
            gamesFounded.push(gameFound);
          }
        }
      } catch (err) {
        console.error(err);
      }
      return res.json(gamesFounded);
    }

    return res.json({ error: 'The name of the game is wrong, try again!' });
  }
}
export default new GameController();
