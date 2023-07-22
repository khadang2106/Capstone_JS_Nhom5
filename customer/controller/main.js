let api = new ServiceApi();

function domEle(id) {
  return document.getElementById(id);
}
let isValid = true;
function openTableCart() {
  let tableCart = domEle('showCart');
  if (isValid) {
    tableCart.classList.add('show-cart');
    isValid = false;
  } else {
    tableCart.classList.remove('show-cart');
    isValid = true;
  }
  return isValid;
}
function continueShopping() {
  let tableCart = domEle('showCart');
  if (isValid === false) {
    tableCart.classList.remove('show-cart');
    isValid = true;
  };
}
// document.getElementById("showCart").onmouseout = () => {
//   domEle('showCart').classList.remove('show-cart');
// };
const rennderUI = (arr) => {
  let content = "";
  for (let i = 0; i < arr.length; i++){
    console.log(arr);
    let product = arr[i];
    if(product){
      content += `
      <div class="card col-xl-3 col-md-5 col-10 product-item" style="width: 18rem">
      <div class="product-img">
        <img src="${product.img}" class="card-img-top" alt="..." />
        <div class="product-info">
          <h2>Detail Product</h2>
          <p>Screen : ${product.screen}</p>
          <p>Back Camera : ${product.backCamera}</p>
          <p>Front Camera : ${product.frontCamera}</p>
          <p class="product-moreInfo"><a href="#">more info product</a></p>
        </div>
      </div>
      <div class="card-body">
        <a href="#">
          <h5 class="card-title">${product.name}</h5>
        </a>
        <span class="card-moneySell">$${product.price}</span>
        <span class="card-moneyDis">$${product.price - (product.price * 0.1)}</span>
      </div>
      <div class="brand">
        <p>${product.type}</p>
      </div>
      <div class="about">About Machine : ${product.desc}</div>
      <div class="card-btn">
        <button class="btn-pay">Pay Now</button>
        <button class="btn-add">
          <i class="fa fa-cart-plus nav-item3"></i>
        </button>
      </div>
    </div>
      `
    };
  }
  domEle("tableShowProduct").innerHTML = content;
}
const getListProduct = () => {
  let promise = api.getListApi();

  promise
    .then(function(result){
      // console.log(result.data);
      rennderUI(result.data);
    })
    .catch(function(error){
      console.log(error);
    })
}
getListProduct();