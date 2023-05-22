export class ShoppingCartPage {
  getShoppingCartProduct(nameProduct) {
    return cy.get(`[name= '${nameProduct}']`);
  }

  getShoppingCartPrice(nameProduct,priceProduct) {
    return cy.get(`[name= '${nameProduct}']`)
      .siblings(`[name= '${priceProduct}']`);
  }
}
