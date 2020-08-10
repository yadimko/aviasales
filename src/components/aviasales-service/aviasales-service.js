export default class AviasalesService {
  async getSearchID() {
    const link = 'https://front-test.beta.aviasales.ru/'
    let response = await fetch(`${link}search`, { method: 'GET' });
    let data = await response.json();
    return data.searchId;
  }

  async getTickets(id) {
    const link = 'https://front-test.beta.aviasales.ru/'
    let response = await fetch(`${link}tickets?searchId=${id}`, { method: 'GET' });
    if(response.status !== 200){
      response = await fetch(`${link}tickets?searchId=${id}`, { method: 'GET' });
    }
    let data = await response.json();
    return data
  }

  async getTicketsAlternativeMethod() {
    const link = 'https://front-test.beta.aviasales.ru/';
    let responseId = await fetch(`${link}search`, { method: 'GET' });
    let dataId = await responseId.json();
    let response = await fetch(`${link}tickets?searchId=${dataId.searchId}`, { method: 'GET' });
    let data = await response.json();
    return data
  }
}

