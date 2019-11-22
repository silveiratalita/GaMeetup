import Game from '../../models/Game';
import * as yup from 'yup';

class GameController {
  async store(req, res) {
    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string().required(),
      type: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }
    try {
      if (req.body.name != undefined && req.body.type != undefined) {
        const gameExists = await Game.findOne({
          where: { name: req.body.name },
        });

        if (gameExists) {
          return res.status(400).json({ error: 'Game already registered' });
        }
        const gameCreated = await Game.create(req.body);
        return res.json(gameCreated);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async updateGame(req, res) {
    const { type, name } = req.body;
    const {id } = req.params;
    const yup = require('yup');
    const schema = yup.object().shape({
      name: yup.string(),
      type: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({
          error: ' Try again, change at least the type or name of the game ',
        });
    }
    console.log('PARAMS', req.params)

    try {
      const gameRegistred = await Game.findOne({ where: { id:id } });
      if (gameRegistred.name != name || gameRegistred.type != type) {
        const gameUpdated = await Game.update(req.body, {
          where: { id :id},
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

    const gameFound = await Game.findOne({ where: { id: id } });

    if (!gameFound) {
      return res.send(json({ msg: "Game Not Found" }));
    }
    const deletedGame = await Game.destroy({ where: { id: id } });
    return res.send(deletedGame);
  }
  async searchGames(req, res) {
    const [games] = res.body;
    if (games != undefined && games.lenght >= 0) {
      const gamesFound = await Game.findAll({ where: games.map(game => game.name) });
      return res.send(gamesFound.map(game => game));
    }
    return res.send(json({ msg: "No Game Found" }));
   }
}
export default new GameController();
