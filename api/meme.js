const axios = require('axios');
const token = require('./token.json');
const { templateIds } = require('./template');

async function geraMeme(...args) {
  const commandArray = [...args];
  const idMeme = parseInt(commandArray[0].match(/\d+/), 10);

  console.log(commandArray);
  console.log(idMeme);

  if (!idMeme) throw new Error('*Dados errados!*');
  if (idMeme < 1 || idMeme > 100) throw new Error('*Só números entre 1 e 100*');

  const options = {
    method: 'POST',
    url: token.urlMeme,
    params: {
      template_id: templateIds[idMeme - 1],
      username: token.username,
      password: token.password,
      font: 'impact',
      max_font_size: '40px',
      'boxes[0][text]': commandArray[1],
      'boxes[1][text]': commandArray[2],
      'boxes[2][text]': commandArray[3],
      'boxes[3][text]': commandArray[4],
      'boxes[4][text]': commandArray[5],
    },
  };

  try {
    const { data: { data: { url } } } = await axios.request(options);
    return url;
  } catch (error) {
    throw new Error('*Erro na api....*');
  }
}

module.exports = { geraMeme };
