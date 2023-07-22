function Service() {
  this.getListProductApi = function () {
    let promise = axios({
      url: 'https://64bb72405e0670a501d7082f.mockapi.io/Products',
      method: 'GET',
    });

    return promise;
  };
}
