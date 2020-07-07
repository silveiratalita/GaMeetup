import * as yup from 'yup';
import dayjs from 'dayjs';
import Meetup from '../../models/Meetup';
import Game from '../../models/Game';
import Player from '../../models/Player';
import MeetupMessage from '../../models/MeetupMessage';
import dbErrorTranslate from '../../../lib/dbErrorTranslate';

class MeetupController {
  
   createMessage = async(req, res)=> {

    const {meetupId,playerId}=req.params
    
    const { date, content  } = req.body;

    const dayjs = require('dayjs');

    const dateToFormat = dayjs(date, 'America/Sao_Paulo');
    req.body.date = dateToFormat.format('YYYY-MM-DDTHH:mm:ssZ');
   


    const message = {date,content,meetupId, playerId};

    
    try {
        const messageCreated = await MeetupMessage.create(message);
        return res.send(messageCreated);
    
    } catch (err) {
    //  return res.send(dbErrorTranslate(err.parent));
    //   console.log(err.parent);
    console.log('aquiiiiii---------------------------',err)
    }
  }

}
export default new MeetupController();
