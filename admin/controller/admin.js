import { Service } from '../services/api.js';
import { Product } from '../models/product.js';
import { Validation } from '../models/validation.js';

const api = new Service();
const valid = new Validation();

domId('btnAdd').onclick = function () {
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button type="button" class="btn btn-info fn-btn" onclick="addProduct()">Add</button>`;

  resetError();
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
          <td>$${element.price}</td>
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
            }')"><i class="fa-solid fa-trash"></i></button>
            <button type="button" data-toggle="modal" data-target="#addingModal" class="btn btn-warning fn-btn" onclick="modProduct('${
              element.id
            }')"><i class="fa-solid fa-wrench"></i></button>
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
  const screen = domId('phoneScreen').value + `"`;
  const backCamera = domId('phoneBackCam').value;
  const frontCamera = domId('phoneFrontCam').value;
  const img = domId('phoneImg').value;
  const desc = domId('phoneDesc').value;
  const type = domId('selcBrand').value;

  checkWhenType();
  if (checkValid()) {
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
  }

  return null;
};

/**
 * Add Product
 */
window.addProduct = () => {
  const product = getFormValues();
  checkWhenType();

  if (product) {
    const promise = api.addProductApi(product);
    promise
      .then(() => {
        getListProduct();
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${product.name} has been added successfully!`,
        });
        domId('selcFilter').value = 'Default';
        document.querySelectorAll('.modal-footer button')[1].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

/**
 * Delete Product
 */
window.delProduct = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        api
          .delProductApi(id)
          .then(() => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              `Your product has been deleted!`,
              'success'
            );

            getListProduct();

            domId('selcFilter').value = 'Default';
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          `Your product's file is safe :)`,
          'error'
        );
      }
    });
  // const promise = api.getProductById(id);
  // promise
  //   .then((result) => {
  //     const content = `Are you sure you want to remove <span class="font-weight-bold font-italic text-success">${result.data.name}</span> from the list?`;
  //     const modalBtn = `
  //       <button type="button" class="btn btn-info fn-btn" onclick="confirmDelete('${id}')">Yes</button>
  //       <button id="btnCloseBox" type="button" class="btn btn-danger fn-btn" data-dismiss="modal">No</button>
  //     `;

  //     domId('modalBodyConfirm').innerHTML = content;
  //     domId('modalFooterConfirm').innerHTML = modalBtn;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

// window.confirmDelete = (id) => {
//   const promise = api.delProductApi(id);
//   promise
//     .then((result) => {
//       alert(`${result.data.name} has been deleted successfully!`);
//       getListProduct();
//       domId('selcFilter').value = 'Default';
//       document.querySelectorAll('#modalFooterConfirm button')[1].click();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

/**
 * Update Product
 */
//Modify Product
window.modProduct = (id) => {
  resetError();
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button type="button" class="btn btn-warning fn-btn" onclick="updateProduct('${id}')">Update</button>`;

  const promise = api.getProductById(id);
  promise
    .then((result) => {
      fillFormValues(
        result.data.name,
        result.data.price,
        result.data.screen.replace(`"`, ''),
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

  if (product) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        const promise = api.updateProductApi(product);
        promise
          .then(() => {
            getListProduct();

            Swal.fire('Saved!', '', 'success');

            domId('selcFilter').value = 'Default';

            document.querySelectorAll('.modal-footer button')[1].click();
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
};

/**
 * Search Product by name
 */
const getArrSearch = (keyword) => {
  const promise = api.getListProductApi();
  promise
    .then((result) => {
      const arrProduct = result.data;

      const filtered = arrProduct.filter((element) => {
        const productNameLowerCase = element.name
          .trim()
          .toLowerCase()
          .replace(/\s/g, '');
        const keyWordLowerCase = keyword
          .trim()
          .toLowerCase()
          .replace(/\s/g, '');
        if (productNameLowerCase.indexOf(keyWordLowerCase) !== -1) {
          return true;
        }
        return false;
      });

      renderUI(filtered);
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchProduct = () => {
  const keyword = domId('searchName').value;
  getArrSearch(keyword);
};

domId('searchName').addEventListener('keyup', searchProduct);

/**
 * Filter Product by price
 */
domId('selcFilter').onchange = () => {
  const selc = domId('selcFilter').value;
  filterByPrice(selc);
};

const filterByPrice = (selc) => {
  const promise = api.getListProductApi();
  promise
    .then((result) => {
      const arrProduct = result.data;
      if (selc === 'ascending') {
        arrProduct.sort((a, b) => a.price - b.price);
        renderUI(arrProduct);
      } else if (selc === 'descending') {
        arrProduct.sort((a, b) => b.price - a.price);
        renderUI(arrProduct);
      } else {
        renderUI(arrProduct);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Validation function
 */
const checkValid = () => {
  const name = domId('phoneName').value;
  const price = domId('phonePrice').value;
  const screen = domId('phoneScreen').value;
  const backCamera = domId('phoneBackCam').value;
  const frontCamera = domId('phoneFrontCam').value;
  const img = domId('phoneImg').value;
  const desc = domId('phoneDesc').value;

  let isValid = true;

  //Validate Name
  isValid &=
    valid.checkEmpty(name, 'errorName', `(*) Product's name is required!`) &&
    valid.checkPattern(
      name,
      /^(?=.*[a-zA-Z])([a-zA-Z0-9 ]+)$/,
      'errorName',
      `(*) Invalid Product's name`
    ) &&
    valid.checkLength(
      name,
      'errorName',
      `(*) Product's name must be between 2 - 32 characters long`,
      32,
      2
    );

  //Validate Price
  isValid &=
    valid.checkEmpty(price, 'errorPrice', `(*) Product's price is required!`) &&
    valid.checkPattern(
      price,
      /^((?!0)\d{1,10}|0|\.\d{1,2})($|\.$|\.\d{1,3}$)/,
      'errorPrice',
      `(*) Only allow maximum 3-decimal digit`
    ) &&
    valid.checkLimit(
      price,
      'errorPrice',
      `(*) Price must be between $100 - $5000`,
      5000,
      100
    );

  //Validate Screen
  isValid &=
    valid.checkEmpty(
      screen,
      'errorScreen',
      `(*) Product's screen size is required!`
    ) &&
    valid.checkPattern(
      screen,
      /^\d*\.?\d{0,2}$/,
      'errorScreen',
      `(*) Only allow maximum 2-decimal digit`
    ) &&
    valid.checkLimit(
      screen,
      'errorScreen',
      `(*) Screen's size must be between 1 - 10"`,
      10
    );

  //Validate Back Camera
  isValid &=
    valid.checkEmpty(
      backCamera,
      'errorBackCam',
      `(*) Back Camera's Resolution is required!`
    ) &&
    valid.checkPattern(
      backCamera,
      /^(?=.*[a-zA-Z])([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s 0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>~`\/?]+)$/,
      'errorBackCam',
      `(*) Invalid Back Camera's Resolution`
    ) &&
    valid.checkLength(
      backCamera,
      'errorBackCam',
      `(*) Back Camera's Resolution must be between 3 - 50 characters long`,
      50,
      3
    ) &&
    valid.checkCamResoLimit(
      backCamera,
      'errorBackCam',
      `(*) Back Camera's Resolution must be between 1 - 150MP`,
      150
    );

  //Validate Front Camera
  isValid &=
    valid.checkEmpty(
      frontCamera,
      'errorFrontCam',
      `(*) Front Camera's Resolution is required!`
    ) &&
    valid.checkPattern(
      frontCamera,
      /^(?=.*[a-zA-Z])([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s 0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>~`\/?]+)$/,
      'errorFrontCam',
      `(*) Invalid Front Camera's Resolution`
    ) &&
    valid.checkLength(
      frontCamera,
      'errorFrontCam',
      `(*) Front Camera's Resolution must be between 3 - 10 characters long`,
      10,
      3
    ) &&
    valid.checkCamResoLimit(
      frontCamera,
      'errorFrontCam',
      `(*) Front Camera's Resolution must be between 1 - 150MP`,
      150
    );

  //Validate Img
  isValid &=
    valid.checkEmpty(img, 'errorImg', `(*) Product's image is required!`) &&
    valid.checkPattern(
      img,
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*).(?:png|jpg|jpeg|gif|png|svg)/,
      'errorImg',
      `(*) Invalid Img's URL`
    );

  //Validate Description
  isValid &=
    valid.checkEmpty(
      desc,
      'errorDesc',
      `(*) Product's description is required!`
    ) &&
    valid.checkPattern(
      desc,
      /^(?=.*[a-zA-Z])([a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s 0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>~`\/?]+)$/,
      'errorDesc',
      `(*) Invalid Product's description`
    ) &&
    valid.checkLength(
      desc,
      'errorDesc',
      `(*) Product's name must be between 5 - 100 characters long`,
      100,
      5
    );

  //Validate Selection
  isValid &= valid.checkSelc(
    'selcBrand',
    'errorSelc',
    `(*) Product's brand is required!`
  );

  return isValid;
};

const checkWhenType = () => {
  domId('phoneName').addEventListener('keyup', checkValid);
  domId('phonePrice').addEventListener('keyup', checkValid);
  domId('phoneScreen').addEventListener('keyup', checkValid);
  domId('phoneBackCam').addEventListener('keyup', checkValid);
  domId('phoneFrontCam').addEventListener('keyup', checkValid);
  domId('phoneImg').addEventListener('keyup', checkValid);
  domId('phoneDesc').addEventListener('keyup', checkValid);
  domId('selcBrand').addEventListener('change', checkValid);
};
