export class AccountService {
  getAccountListApi() {
    const promise = axios({
      url: 'https://64c4906d67cfdca3b660d4e0.mockapi.io/Accounts',
      method: 'GET',
    });

    return promise;
  }

  getAccountById(id) {
    const promise = axios({
      url: `https://64c4906d67cfdca3b660d4e0.mockapi.io/Accounts/${id}`,
      method: 'GET',
    });

    return promise;
  }
}
