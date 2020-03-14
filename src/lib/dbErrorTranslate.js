function dbErrorTranslate(err) {
  let parsedMsg;
  let rgx;
  let matches;
  console.log('err.message aqui======>', err.message);

  switch (err.code) {
    case '23502':
      rgx = /null value in column "([^"]+)" violates not-null constraint/;
      matches = rgx.exec(err.message);
      parsedMsg = `Field "${matches[1]}" could not be null`;
      break;
    case '23505':
      rgx = /duplicate key value violates unique constraint([^"])/;
      matches = rgx.exec(err.message);
      console.log('matches-----', matches);
      parsedMsg = `Filed "${matches[1]}" already registred`;
      break;

    //   case '22007':
    //     return `You are in  ${err.code}  error code! This error occurred in${err.routine} routine. Look at parameters to undertand: ${err.parameters} `;
    //     break;
    //   case '23503':
    //     return `You are in  ${err.code} error code! The message is   ${err.detail}. This errror occurred in  ${err.table} table.  This erros was checked in routine ${err.routine}. So, please, check the constraint ${err.constraint},since there is a big chance that this value dont't exist in it!!!`;
    //     break;
    //   case '22P02':
    //     return `You are in  ${err.code} error code! The message is   ${err}.  This erros was checked in routine ${err.routine}. So, please, check the parameters ${err.parameters},since there is a big chance that some value is invalid!!!`;
    //     break;
    //   default:
    //     return 'error: 500   => Something went wrong!';
  }

  return {
    message: parsedMsg || err.message,
    code: err.code,
    detail: err.detail,
    table: err.table,
    routine: err.routine,
    constraint: err.constranint,
  };
}

export default dbErrorTranslate;
