function domEle(id) {
    return document.getElementById(id);
};
var isValid = true;
function openTableCart() {
    let tableCart = domEle("showCart");
    if (isValid) {
        tableCart.classList.add("show-cart");
        isValid = false;
    } else {
        tableCart.classList.remove("show-cart");
        isValid = true;
    };
};
function continueShopping(){
    let tableCart = domEle("showCart");
    if(isValid === false){
        tableCart.classList.remove("show-cart");
        isValid = true;
    };
};
