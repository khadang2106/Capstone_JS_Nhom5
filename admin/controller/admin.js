let api = new Service();

getEle('btnAdd').onclick = function () {
  document.querySelector(
    '.modal-footer-btn'
  ).innerHTML = `<button type="button" class="btn btn-success">Add</button>`;
};

function unavailableFn() {
  getEle('btnAdd').disabled = true;
}
function availableFn() {
  getEle('btnAdd').disabled = false;
}

function renderUI(data) {
  let content = '';
  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    content += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
            <img src="${product.img}" class="card-img-top d-block mx-auto" style="width: 100px"/>
          </td>
          <td>${product.desc}</td>
          <td>${product.type}</td>
          <td>
            <button type="button" class="btn btn-danger">Del</button>
            <button type="button" class="btn btn-warning">Fix</button>
          </td>
        </tr>
        `;
  }
  getEle('tbdList').innerHTML = content;
}

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
