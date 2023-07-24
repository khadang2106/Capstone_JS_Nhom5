import { Service } from '../services/api.js';
import { Product } from '../models/product.js';

const api = new Service();

domId('btnAdd').onclick = function () {
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button type="button" class="btn btn-info fn-btn" onclick="addProduct()">Add</button>`;

  resetFormValues();
};

window.unavailableFn = () => (domId('btnAdd').disabled = true);

window.availableFn = () => (domId('btnAdd').disabled = false);

const renderUI = (data) => {
  const content = data.reduce((total, element, index) => {
    total += `
      <tr>
          <td>${index + 1}</td>
          <td>${element.name}</td>
          <td>${element.price}</td>
          <td>
            <img src="${
              element.img
            }" class="card-img-top d-block mx-auto" style="width: 100px"/>
          </td>
          <td>${element.desc}</td>
          <td>${element.type}</td>
          <td class="text-center">
            <button type="button" class="btn btn-danger fn-btn mb-1" onclick="delProduct('${
              element.id
            }')"><i class="fa-solid fa-trash"></i>Delete</button>
            <button type="button" data-toggle="modal" data-target="#addingModal" class="btn btn-warning fn-btn" onclick="modProduct('${
              element.id
            }')"><i class="fa-solid fa-wrench"></i>Modify</button>
          </td>
        </tr>
    `;

    return total;
  }, '');

  domId('tbdList').innerHTML = content;
};

function getListProduct() {
  api
    .getListProductApi()
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

window.onload = () => getListProduct();

const getFormValues = (id = '') => {
  const name = domId('phoneName').value;
  const price = domId('phonePrice').value;
  const screen = domId('phoneScreen').value;
  const backCamera = domId('phoneBackCam').value;
  const frontCamera = domId('phoneFrontCam').value;
  const img = domId('phoneImg').value;
  const desc = domId('phoneDesc').value;
  const type = domId('selcBrand').value;

  const product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  return product;
};

const fillFormValues = (
  name = '',
  price = '',
  screen = '',
  backCamera = '',
  frontCamera = '',
  img = '',
  desc = '',
  type = 'Select brand'
) => {
  domId('phoneName').value = name;
  domId('phonePrice').value = price;
  domId('phoneScreen').value = screen;
  domId('phoneBackCam').value = backCamera;
  domId('phoneFrontCam').value = frontCamera;
  domId('phoneImg').value = img;
  domId('phoneDesc').value = desc;
  domId('selcBrand').value = type;
};

const resetFormValues = () => {
  const name = domId('phoneName').value;
  const price = domId('phonePrice').value;
  const screen = domId('phoneScreen').value;
  const backCamera = domId('phoneBackCam').value;
  const frontCamera = domId('phoneFrontCam').value;
  const img = domId('phoneImg').value;
  const desc = domId('phoneDesc').value;
  const type = domId('selcBrand').value;

  if (
    name !== '' &&
    price !== '' &&
    screen !== '' &&
    backCamera !== '' &&
    frontCamera !== '' &&
    img !== '' &&
    desc !== '' &&
    type !== 'Select brand'
  ) {
    fillFormValues();
  }
};

/**
 * Add Product
 */
window.addProduct = () => {
  const product = getFormValues();

  const promise = api.addProductApi(product);
  promise
    .then(() => {
      getListProduct();
      document.querySelectorAll('.modal-footer button')[1].click();
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Delete Product
 */
window.delProduct = (id) => {
  const promise = api.delProductApi(id);
  promise
    .then((result) => {
      alert(`${result.data.name} has been deleted!`);
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Update Product
 */
//Modify Product
window.modProduct = (id) => {
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button type="button" class="btn btn-warning fn-btn" onclick="updateProduct('${id}')">Update</button>`;

  const promise = api.getProductById(id);
  promise
    .then((result) => {
      fillFormValues(
        result.data.name,
        result.data.price,
        result.data.screen,
        result.data.backCamera,
        result.data.frontCamera,
        result.data.img,
        result.data.desc,
        result.data.type
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

//Update Product
window.updateProduct = (id) => {
  const product = getFormValues(id);

  const promise = api.updateProductApi(product);
  promise
    .then(() => {
      getListProduct();
      alert(`Your product has been updated successfully!`);
      document.querySelectorAll('.modal-footer button')[1].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
