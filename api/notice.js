const axios = require('axios');
const { tokenApiCovid, urlNoticeCovid } = require('./token.json');

async function getDataCovidToStateAndCity(State = 'MA', IsLast = 'sim', Search = 'Codó') {
  const state = State.toUpperCase().trim();
  // eslint-disable-next-line camelcase
  const is_last = IsLast.toUpperCase().trim() === 'SIM' ? 'True' : 'False';
  const search = Search.toLowerCase().trim();

  const options = {
    method: 'GET',
    url: urlNoticeCovid,
    headers: {
      Authorization: `Token ${tokenApiCovid}`,
    },
    params: {
      state, is_last, search,
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.results[0];
    return `${data.place_type !== 'state' ? `*Cidade:* ${data.city}` : `*Estado:* ${data.state}`}\n*código IBGE:* ${data.city_ibge_code}\n*Data de atualização:* ${data.date}\n*Números da semana epidemiológica:* ${data.epidemiological_week}\n*População estimada:* ${data.estimated_population}\n*Últimos casos confirmados:* ${data.last_available_confirmed}\n*Últimos casos confirmado por 100mil habitantes*: ${data.last_available_confirmed_per_100k_inhabitants}\n*Data da última atualização:* ${data.last_available_date}\n*Taxa de mortalidade:* ${data.last_available_death_rate}\n*Número de mortes do último dia disponível:* ${data.last_available_deaths}\n*Novos casos confirmados:* ${data.new_confirmed}\n*Novas mortes confirmadas:* ${data.new_deaths}\n*Ordem do registro:* ${data.order_for_place}\n${data.city ? `*Estado:* ${data.state}` : ''}`;
  } catch (error) {
    throw new Error('*Desculpe ocorreu um erro, tente novamente mais tarde!*');
  }
}

// (async () => {
//   const result = await getDataCovidToStateAndCity('ma', 'sim', '');
//   console.log(result);
// })();

module.exports = { getDataCovidToStateAndCity };
