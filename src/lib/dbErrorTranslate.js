function dbErrorTranslate(err) {
  switch (err.code) {
    case '23502':
      return `You are in  ${err.code}error code! The message is   ${err.detail}. This errror occurred in  ${err.table} table.  This erros was checked in routine ${err.routine}. So, please, check the constraint ${err.constraint},since there is a big chance that this field cannot be null, therefore, you cannot insert null or undefined values in it!!!`;
      break;
    case '23505':
      return `You are in  ${err.code}! The message is   ${err.detail}. This errror occurred in  ${err.table} table.  This erros was checked in routine ${err.routine}. So, please, check the constraint ${err.constraint},since there is a big chance that this field be a unique key, and you can't  repeat this value.  `;
      break;
    default:
      return 'error: 500. Something went wrong!';
  }
}

export default dbErrorTranslate;
