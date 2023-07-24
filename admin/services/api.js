export class Service {
  getListProductApi() {
    const promise = axios({
      url: 'https://64bb72405e0670a501d7082f.mockapi.io/Products',
      method: 'GET',
    });

    return promise;
  }

  addProductApi(obj) {
    const promise = axios({
      url: 'https://64bb72405e0670a501d7082f.mockapi.io/Products',
      method: 'POST',
      data: obj,
    });

    return promise;
  }

  delProductApi(id) {
    const promise = axios({
      url: `https://64bb72405e0670a501d7082f.mockapi.io/Products/${id}`,
      method: 'DELETE',
    });

    return promise;
  }

  getProductById(id) {
    const promise = axios({
      url: `https://64bb72405e0670a501d7082f.mockapi.io/Products/${id}`,
      method: 'GET',
    });

    return promise;
  }

  updateProductApi(obj) {
    const promise = axios({
      url: `https://64bb72405e0670a501d7082f.mockapi.io/Products/${obj.id}`,
      method: 'PUT',
      data: obj,
    });

    return promise;
  }
}
