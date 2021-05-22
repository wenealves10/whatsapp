const axios = require('axios');
const dayjs = require('dayjs');
const token = require('./token.json');

async function getNotices() {
  const options = {
    method: 'POST',
    url: token.urlNotice,
    params: {
      tipo: 'noticia',
      qtd: 3,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  if (!parseInt('1', 10)) console.log(true);
  const text = 'Entra-em-grupo-de-figurinhas';
  console.log(text.replace(/-/gi, ' '));
  await getNotices();
})();
