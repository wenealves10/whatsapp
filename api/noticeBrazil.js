const axios = require('axios');
const { tokenApiNoticeBrazil, urlNoticeBrasil } = require('./token.json');

async function getNoticesBrazil() {
  const options = {
    method: 'GET',
    url: urlNoticeBrasil,
    params: {
      sources: 'google-news-br',
      apiKey: tokenApiNoticeBrazil,
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.articles;
    let templateNotice = '\t\t\t\t *📰 Principais notícias do Brasil 👀*\n\n';
    data.forEach((article, index) => {
      const notice = `\t\t\t\t\t  *📰 Notícia ${index + 1}*\n\n*Título da Nóticia:* ${article.title}\n\n*Descrição:* ${article.description}\n\n*URL da Noticia:* ${article.url}\n\n*Sinopse da notícia:* ${article.content}\n\n\n`;
      templateNotice += notice;
    });
    return templateNotice;
  } catch (error) {
    throw new Error('*Ocorreu um erro... tente novamente mais tarde!*');
  }
}

// (async () => {
//   await getNoticesBrazil();
// })();

module.exports = { getNoticesBrazil };
