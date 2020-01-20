function dbErrorTranslate(code) {
  switch (code) {
    case '23502':
      return `Você caiu no erro  ${code}!  O que acontece é que você está tentando setar como nulo um valor em uma coluna que não pode conter valores nulos,  por favor verifique os valores inseridos e tente novamente`;
      break;
    case '23505':
      return `Você caiu no erro  ${code}!   `;
      break;
    default:
      return 'error:500';
  }
}

export default dbErrorTranslate;
