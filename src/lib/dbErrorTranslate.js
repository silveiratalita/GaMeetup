function dbErrorTranslate(err) {
  switch (err.code) {
    case '23502':
      return {
        message: `You are in  ${err.code} error code! The message is   ${err.detail}. This errror occurred in  ${err.table} table.  This erros was checked in routine ${err.routine}. So, please, check the constraint ${err.constraint},since there is a big chance that this field cannot be null, therefore, you cannot insert null or undefined values in it!!!`,
        code: err.code,
        detail: err.detail,
        table: err.table,
        routine: err.routine,
        constraint: err.constranint,
      };
      break;
    case '23505':
      return {
        message: `You are in  ${err.code} error code!  The message is   ${err.detail}. This errror occurred in  ${err.table} table.  This erros was checked in routine ${err.routine}. So, please, check the constraint ${err.constraint},since there is a big chance that this field be a unique key, and you can't  repeat this value.  `,
        code: err.code,
        detail: err.detail,
        table: err.table,
        routibe: err.routine,
        constraint: err.costraint,
      };
      break;
    case '22007':
      return `You are in  ${err.code}  error code! This error occurred in${err.routine} routine. Look at parameters to undertand: ${err.parameters} `;
      break;
    case '23503':
      return `You are in  ${err.code} error code! The message is   ${err.detail}. This errror occurred in  ${err.table} table.  This erros was checked in routine ${err.routine}. So, please, check the constraint ${err.constraint},since there is a big chance that this value dont't exist in it!!!`;
      break;
    case '22P02':
      return `You are in  ${err.code} error code! The message is   ${err}.  This erros was checked in routine ${err.routine}. So, please, check the parameters ${err.parameters},since there is a big chance that some value is invalid!!!`;
      break;
    default:
      return 'error: 500   => Something went wrong!';
  }
}

export default dbErrorTranslate;
