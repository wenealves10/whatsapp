const axios = require('axios');
const token = require('./token.json');
const { templateIds } = require('./template');

async function geraMeme(...args) {
  const commandArray = [...args];
  const idMeme = parseInt(commandArray[0], 10);

  if (!idMeme) throw new Error('*Dados estão errados!\n*Só números entre 1 e 100*\n*Textos têm que estar separados por /*');
  if (idMeme < 1 || idMeme > 100) throw new Error('*Só números entre 1 e 100*');

  const textArray = commandArray.filter((value, index) => value !== '' && value && index > 0);

  const options = {
    method: 'POST',
    url: token.urlMeme,
    params: {
      template_id: templateIds[idMeme - 1],
      username: token.username,
      password: token.password,
      font: 'impact',
      max_font_size: '40px',
      'boxes[0][text]': textArray[0],
      'boxes[1][text]': textArray[1],
      'boxes[2][text]': textArray[2],
      'boxes[3][text]': textArray[3],
      'boxes[4][text]': textArray[4],
    },
  };

  try {
    const { data: { data: { url } } } = await axios.request(options);
    return url;
  } catch (error) {
    throw new Error('*Ocorreu um erro no sistema! tente novamente mais tarde!*');
  }
}

module.exports = { geraMeme };
