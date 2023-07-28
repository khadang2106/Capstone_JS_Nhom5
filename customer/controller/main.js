import { ServiceApi } from "../service/api.js";
import { Validation } from "../models/_validation.js";
import { CartCount } from "../models/cart.js";

const valid = new Validation();
const api = new ServiceApi();

let arrCart = [];
let isValid = true;

function domEle(id) {
  return document.getElementById(id);
}
// đếm số lượng giỏ hàng
const countCartTotal = () => {
  domEle("countShowcart").innerHTML = arrCart.reduce((total, element) => {
    return total += element.qualityCart;
  }, 0);
}

// Hàm Thanh Toán Tổng tiền
const totalPrice = () => {
  return arrCart.reduce((total, element) => {
    return total += element.qualityCart * element.product.price;
  }, 0);
}
// click giỏ hàng mở bảng thanh toán
window.openTableCart = () => {
  let tableCart = domEle('showCart');
  if (isValid) {
    tableCart.classList.add('show-cart');
    isValid = false;
  } else {
    tableCart.classList.remove('show-cart');
    isValid = true;
  };
  // console.log(arrCart)
  if (arrCart.length === 0) {
    domEle("btnEmpty").style.display = "none";
    domEle("btnPay").style.display = "none";
  } else {
    domEle("btnEmpty").style.display = "inline-block";
    domEle("btnPay").style.display = "inline-block";
  }
};

// const checkCartClass = domEle('showCart').classList.contains('.show-cart');
// const modal = document.getElementById('showCart');
// const cartBtn = document.querySelector(
//   '#collapsibleNavbar .nav-item:nth-of-type(3) .nav-link'
// );
// const cartTxt = document.querySelector(
//   '#collapsibleNavbar .nav-item:nth-of-type(3) .nav-link p'
// )
// const cartLogo = document.querySelector(
//   '#collapsibleNavbar .nav-item:nth-of-type(3) .nav-link i'
// );
// window.onclick = function (event) {
//   if (event.target !== modal && event.target !== cartBtn) {
//     domEle('showCart').classList.remove('show-cart');
//   }
//   if (event.target == cartBtn) {
//     if (checkCartClass === false) {
//       domEle('showCart').classList.toggle('show-cart');
//     }
//   }
// };

//  click tiếp tục mua sắm để đóng bảng
window.continueShopping = () => {
  let tableCart = domEle('showCart');
  if (isValid === false) {
    tableCart.classList.remove('show-cart');
    isValid = true;
  };
}
// hàm tính tổng , render, setlocal
const countRenderLocal = () => {
      countCartTotal();
      renderTablePay(arrCart);
      setLocalStore(arrCart);
}
//  Render Sản Phẩm
const rennderUI = (arr) => {
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    // console.log(arr);
    let product = arr[i];
    if (product) {
      content += `
      <div class="card col-xl-3 col-md-5 col-10 product-item" style="width: 18rem">
      <div class="product-img">
        <img src="${product.img}" class="card-img-top img-fluid" id="imgProduct" alt="..." />
        <div class="product-info">
          <h2>Detail Product</h2>
          <p>Screen : <span id="screenProduct">${product.screen}</span></p>
          <p id="backProduct">Back Camera : ${product.backCamera}</p>
          <p id="frontProduct">Front Camera : ${product.frontCamera}</p>
          <p class="product-moreInfo"><a href="#">more info product</a></p>
        </div>
      </div>
      <div class="card-body">
        <a href="#">
          <h5 class="card-title" id="nameProduct">${product.name}</h5>
        </a>
        <span class="card-moneySell">$<span id="priceProduct">${product.price}</span></span>
        <span class="card-moneyDis" id="discountProduct">$${(Number(product.price) + Number(product.price * 0.1))}</span>
      </div>
      <div class="brand">
        <p id="typeProduct">${product.type}</p>
      </div>
      <div class="about" id="descProduct">About Machine : ${product.desc}</div>
      <div class="card-btn">
        <button class="btn-pay" id="btnPayonly1" data-toggle="modal" data-target="#addingModal" onclick="payOnlyProduct()">Pay Now</button>
        <button class="btn-add" id="btnAdd" onclick="addProductToCart(${product.id})">
          <i class="fa fa-cart-plus nav-item3"></i>
        </button>
      </div>
    </div>
      `
    };
  }
  domEle("tableShowProduct").innerHTML = content;
};
//  Render bảng thanh toán
const renderTablePay = (arr) => {
  let content = "";
  for (let i = 0; i < arr.length; i++) {
    const product = arr[i].product;
    if (product) {
      content += `
    <div class="item">
      <div class="cart-product row">
        <div class="cart-product-img col-6 " style="width: 20rem">
          <img src="${product.img}" class="img-fluid" alt="" id="imgShowCart" />
        </div>
        <div class="cart-product-info col-6">
          <h6 id="nameShowCart"> ${product.name}</h6>
          <p id="screenShowcart">Screen: ${product.screen} </p>
          <p id="backShowCart">BackCamera: ${product.backCamera}</p>
          <p id="frontShowCart">FrontCamera: ${product.frontCamera}</p>
          <a onclick="removeItem(${product.id})">remove</a>
        </div>
      </div>
      <div class="cart-temporary">
        <div class="temporary-quantity">
          <h5>Quantity :</h5>
          <a>
            <i class="fa fa-minus-circle" onclick="minusQuality(${product.id})"></i>
          </a>
          <span class="temporary-quality" id="qualityShowCart">${arr[i].qualityCart}</span>
          <a>
            <i class="fa fa-plus-circle" onclick="plusQuality(${product.id})"></i>
          </a>
          <span class="temporary-price"><span id="totalShowCart">$${(arr[i].qualityCart * product.price)}</span></span>
        </div>
      </div>
    </div>
    <hr>
      `
    };
  };
  const total = totalPrice();
  const shipping = total > 0 ? 10 : 0;
  domEle("totalProduct").innerHTML = "$" + total;
  domEle("totalShip").innerHTML = "$" + shipping;
  domEle("totalTax").innerHTML = "$" + Math.floor(total * 0.1);
  domEle("totalItem").innerHTML = "$" + Math.floor(total + shipping + Math.floor(total * 0.1));

  domEle("showInfoProduct").innerHTML = content;
}
//  Lấy Product từ Data API
const getListProduct = () => {
  let promise = api.getListApi();

  promise
    .then(function (result) {
      rennderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
      alert("Data on Sever Error")
    })
}
//  đợi load trang song thì lấy data
window.onload = () => {
  getListProduct();
  getLocalStore();
  countCartTotal();
  renderTablePay(arrCart);
};

// Lưu LocalStorage
const setLocalStore = (arr) => {
  const string = JSON.stringify(arr);
  localStorage.setItem("arrCart", string);
}
// lấy lên UI LocalStorage
const getLocalStore = () => {
  if (localStorage.getItem("arrCart")) {
    const string = localStorage.getItem("arrCart");
    arrCart = JSON.parse(string);
    countCartTotal();
  };
}
//  Tìm Sản Phẩm trong mảng


//  Thêm sản phẩm vào giỏ hàng arrCart
window.addProductToCart = (id) => {
  const promise = api.getProductByID(id);
  promise
    .then(function (result) {
      const cartItem = new CartCount(result.data, 1);
      const itemInArrCartPay = cartItem.findItemByID(arrCart, cartItem.product.id);

      if (arrCart.length === 0) {
        arrCart.push(cartItem);
      } else {
        for (let i = 0; i < arrCart.length; i++) {
          let item = arrCart[i];
          if (item.product.id === cartItem.product.id) {
            item.qualityCart++;
            break;
          } else if (!itemInArrCartPay) {
            arrCart.push(cartItem);
            break;
          }
        };
      };

      countRenderLocal();
      domEle("btnEmpty").style.display = "inline-block";
      domEle("btnPay").style.display = "inline-block";
    })
    .catch(function (error) {
      alert("Get Product By ID Error")
    })
};
// Remove Khỏi sản phẩm
window.removeItem = (id) => {
  for (let i = 0; i < arrCart.length; i++) {
    const item = arrCart[i].product;
    if (Number(item.id) === id) {
      arrCart.splice(i, 1);
      break;
    }
  };
  if (arrCart.length === 0) {
    domEle("btnEmpty").style.display = "none";
    domEle("btnPay").style.display = "none";
  } else {
    domEle("btnEmpty").style.display = "inline-block";
    domEle("btnPay").style.display = "inline-block";
  }
  countRenderLocal();
};
//  Xóa tất cả sản phẩm khỏi giỏ hàng
window.emptyCart = () => {
  swal("Do You Want Clear All Items??", {
    buttons: {
      cancel: "Cancel",
      catch: {
        text: "Yes I Want..",
        value: "catch",
      },
      // defeat: true,
    },
  })

    .then((value) => {
      switch (value) {
        case "catch":
          arrCart = [];
          countRenderLocal();
          domEle("showCart").classList.remove('show-cart');
          isValid = true;
          swal("Gotcha!", "All Your Products Have Been Removed", "success");
          break;

        default:
          swal("OKay!!  Now You Can Continue Shopping");
      }
    });
};
//  Thêm số lượng sản phẩm
window.plusQuality = (id) => {
  console.log(id);
  for (let i = 0; i < arrCart.length; i++) {
    const item = arrCart[i];
    if (Number(item.product.id) === id) {
      item.qualityCart++;
      break;
    }
  }
  countRenderLocal();
}
//  Bớt số lượng sản phẩm
window.minusQuality = (id) => {
  console.log(id);
  for (let i = 0; i < arrCart.length; i++) {
    const item = arrCart[i];
    if (Number(item.product.id) === id) {
      if (item.qualityCart >= 1) {
        item.qualityCart--;
        if (item.qualityCart === 0) {
          arrCart.splice(i,1);
          domEle("btnEmpty").style.display = "none";
          domEle("btnPay").style.display = "none";
          break;
        };
      } ;
    };
  };
  countRenderLocal();
}
//  Lọc danh sách theo hãng
domEle("selcOption").onchange = () => {
  const arrData = api.getListApi();
  arrData
    .then(function (result) {
      const type = domEle("selcOption").value;
      // console.log(type)
      const arrType = result.data.filter((element) => {
        if (type === "all") {
          return true;
        }
        return element.type === type;
      });
      // console.log(arrType);
      rennderUI(arrType);
    })
    .catch(function (error) {
      alert("Get List For Selection Error")
    })
}

const validation = () => {
  const name = domEle("orderName").value;
  const phone = domEle("orderPhone").value;
  const id = domEle("orderID").value;
  const address = domEle("orderAddress").value;
  const desc = domEle("orderDesc").value;

  let validda = true;

  // check name
  validda &= valid.checkEmpty(name,"errorName","Please do not leave it blank");
  validda &= valid.checkEmpty(phone,"errorPhone","Please do not leave it blank");
  validda &= valid.checkEmpty(id,"errorID","Please do not leave it blank");
  validda &= valid.checkEmpty(address,"errorAddress","Please do not leave it blank");
  validda &= valid.checkEmpty(desc,"errorDesc","Please do not leave it blank");
  return validda;
}
// Reset error Alert
window.showTableOrder = () => {
  domEle("errorName").style.display = "none";
  domEle("errorPhone").style.display = "none";
  domEle("errorID").style.display = "none";
  domEle("errorAddress").style.display = "none";
  domEle("errorDesc").style.display = "none";

  domEle("orderName").value = "";
  domEle("orderPhone").value = "";
  domEle("orderID").value = "";
  domEle("orderAddress").value = "";
  domEle("orderDesc").value= "";

}
// Thanh toán hiện cảm ơn
window.thanks = () => {
  const check = validation();

  if (check) {
    domEle("closeModal").click();
    swal("Good job!", "Thank You For Shopping In Our Store", "success");
  }
}
// reset
window.payOnlyProduct = () => {
  domEle("errorName").style.display = "none";
  domEle("errorPhone").style.display = "none";
  domEle("errorID").style.display = "none";
  domEle("errorAddress").style.display = "none";
  domEle("errorDesc").style.display = "none";

  domEle("orderName").value = "";
  domEle("orderPhone").value = "";
  domEle("orderID").value = "";
  domEle("orderAddress").value = "";
  domEle("orderDesc").value= "";
}