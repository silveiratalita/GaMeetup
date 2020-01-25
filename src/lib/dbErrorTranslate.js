function dbErrorTranslate(err) {
  switch (err.code) {
    case '23502':
      return `Você caiu no erro  ${err.code}! A mensagem que foi informada é a   ${err.detail}Esse erro ocorreu na tabela ${err.table}. O erro foi verificado no processo ${err.routine}. Portanto, por favor, verifique  a constraint ${err.constraint}, já que há grande chance de esse campo não poder ser nulo ou undefined, logo, você não poderá inserir valores nulos ou undefined nele!`;
      break;
    case '23505':
      return `Você caiu no erro  ${err.code}! A mensagem que foi informada é a   ${err.detail}Esse erro ocorreu na tabela ${err.table}. O erro foi verificado no processo ${err.routine}. Portanto, por favor, verifique  a constraint ${err.constraint}, já que há grande chance de esse campo ser unique e não poder ser repetido em outro registro.  `;
      break;
    default:
      return 'error:500';
  }
  console.log('aqiooooo', err);
}

export default dbErrorTranslate;
