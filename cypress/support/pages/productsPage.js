export class ProductsPage{

addProduct(nombreProducto){
   return cy.contains('p', `${nombreProducto}`)
}

};