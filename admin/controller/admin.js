let api = new Service();

domId('btnAdd').onclick = function () {
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button type="button" class="btn btn-info fn-btn">Add</button>`;
};

function unavailableFn() {
  domId('btnAdd').disabled = true;
}
function availableFn() {
  domId('btnAdd').disabled = false;
}

const renderUI = (data) => {
  const content = data.reduce((total, element) => {
    total += `
      <tr>
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td>${element.price}</td>
          <td>
            <img src="${element.img}" class="card-img-top d-block mx-auto" style="width: 100px"/>
          </td>
          <td>${element.desc}</td>
          <td>${element.type}</td>
          <td>
            <button type="button" class="btn btn-danger fn-btn"><i class="fa-solid fa-trash"></i>Delete</button>
            <button type="button" class="btn btn-warning fn-btn"><i class="fa-solid fa-wrench"></i>Modify</button>
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

getListProduct();
