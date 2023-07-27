
export class CartCount {
    constructor(product, qualityCart) {
        this.product = product;
        this.qualityCart = qualityCart;
    };
    findItemByID = (arr, id) => arr.find((element) => {
        if (element.product.id === id) {
          return true;
        } else {
          return false;
        }
      });
};