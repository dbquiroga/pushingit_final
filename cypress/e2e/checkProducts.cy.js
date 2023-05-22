/// <reference types="cypress" />
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe('Check Products', () =>{
let productsData;
let loginData;

const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();

    before('Define fixtures', () => {
        cy.fixture('products').then((data) =>{
            productsData = data
        });
        cy.fixture('login').then((data) =>{
            loginData = data
        });
    });

    beforeEach('Login and go to shop',()=>{
        cy.visit('/');
        cy.get('#registertoggle').dblclick();
        cy.get('#user').type(`${loginData.users.user_valid}`);
        cy.get('#pass').type(loginData.users.pass_valid);
        cy.get('#submitForm').click();
        cy.get('[id^="user"]').should('exist');
        cy.get('#onlineshoplink').click();
        cy.url().should('include', '/onlineshop') 
    });

    it('Check product and price', () => {
        productsPage.addProduct(productsData.blackTshirt.name)
        .siblings('button')
        .click();

        cy.get('#closeModal').click();

        productsPage.addProduct(productsData.whiteShoes.name)
        .siblings('button')
        .click();

        cy.get('#closeModal').click();

        cy.get('#goShoppingCart').click();
        cy.get('#title').should('have.text', 'Shopping Cart')

        shoppingCartPage.getShoppingCartProduct(productsData.blackTshirt.name).should('have.text', productsData.blackTshirt.name);
        shoppingCartPage.getShoppingCartProduct(productsData.whiteShoes.name).should('have.text', productsData.whiteShoes.name);
        
        shoppingCartPage.getShoppingCartPrice(productsData.blackTshirt.name,productsData.blackTshirt.price.toString())
        .should('have.text', `$${productsData.blackTshirt.price}`);

        shoppingCartPage.getShoppingCartPrice(productsData.whiteShoes.name,productsData.whiteShoes.price.toString())
        .should('have.text', `$${productsData.whiteShoes.price}`);

        cy.xpath('//button[text()="Show total price"]').click();
        cy.get('#price')
            .invoke('text')
            .then((text) => {
                const precio = isNaN(text) ? 0 : parseFloat(text);
                const total = productsData.blackTshirt.price + productsData.whiteShoes.price;                
                expect(total).to.equal(precio);
            });
    });
});