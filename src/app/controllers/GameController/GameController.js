import * as yup from 'yup';
import Game from '../../models/Game';

class GameController {
  async store(req, res) {
    const yup = require('yup');
    const schema = yup.object().shape(
      {
        name: yup.string().required(),
        type: yup.string().required(),
      },
      ['name', 'type']
    );
    let game;

    // Validates, XXX: need to be refactored
    try {
      game = await schema.validate(req.body, {
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

      return res.status(400).json(errObj);
    }

    try {
      const gameExists = await Game.findOne({
        where: { name: game.name },
      });

      if (gameExists) {
        return res.status(400).json({ error: 'Game already registered' });
      }

      const gameCreated = await Game.create(game);

      return res.json(gameCreated);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateGame(req, res) {
    const { type, name } = req.body;
    const { id } = req.params;
    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string(),
      type: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: ' Try again, change at least the type or name of the game ',
      });
    }
    console.log('PARAMS', req.params);

    try {
      const gameRegistred = await Game.findOne({ where: { id } });
      if (gameRegistred.name != name || gameRegistred.type != type) {
        const gameUpdated = await Game.update(req.body, {
          where: { id },
        });
        return res.send(gameUpdated);
      }
      return res.json({ msg: 'No change in this game!' });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteGame(req, res) {
    const { id } = req.params;

    const gameFound = await Game.findOne({ where: { id } });

    if (!gameFound) {
      return res.send(json({ msg: 'Game Not Found' }));
    }
    const deletedGame = await Game.destroy({ where: { id } });
    return res.send(deletedGame);
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
