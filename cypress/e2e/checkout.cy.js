/// <reference types="cypress" />
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { Home } from "../support/pages/home";
import { CheckOut } from "../support/pages/checkOut";
import { Recipt } from "../support/pages/recipt";
const { baseUrl } = cypress.e2e();

describe("Check Products", () => {
  const numAleatorio = Math.floor(Math.random() * 1000);
  const username = `lisa${numAleatorio}`;
  let productsData;
  let checkoutData;

  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const homePage = new Home();
  const checkOutPage = new CheckOut();
  const reciptPage = new Recipt();

  before("Define fixtures", () => {
    cy.fixture("products").then((data) => {
      productsData = data;
    });

    cy.fixture("checkout").then((data) => {
      checkoutData = data;
    });
  });

  beforeEach("Register and Login user", () => {
    cy.request({
      url: "https://pushing-it.onrender.com/api/register",
      failOnStatusCode: false,
      method: "POST",
      body: {
        username: username,
        password: "123456!",
        gender: "female",
        day: "8",
        month: "8",
        year: "1930",
      },
    }).then((respuestaRegister) => {
      expect(respuestaRegister.status).to.be.equal(200);
    });
    cy.request({
      url: "https://pushing-it.onrender.com/api/login",
      method: "POST",
      body: {
        username: username,
        password: "123456!",
      },
    }).then((respuestaLogin) => {
      window.localStorage.setItem("token", respuestaLogin.body.token);
      window.localStorage.setItem("user", respuestaLogin.body.user.username);
      expect(respuestaLogin.status).to.be.equal(200);
    });

    cy.visit(baseUrl);
    cy.url().should("include", "/home");
  });

  it("select a product and checkout", () => {
    cy.get(homePage.linkToShopping).click();
    productsPage
      .addProduct(productsData.blackTshirt.name)
      .siblings("button")
      .click();

    cy.get("#closeModal").click();

    productsPage
      .addProduct(productsData.whiteShoes.name)
      .siblings("button")
      .click();

    cy.get("#closeModal").click();

    cy.get("#goShoppingCart").click();
    cy.get("#title").should("have.text", "Shopping Cart");

    shoppingCartPage
      .getShoppingCartProduct(productsData.blackTshirt.name)
      .should("have.text", productsData.blackTshirt.name);
    shoppingCartPage
      .getShoppingCartProduct(productsData.whiteShoes.name)
      .should("have.text", productsData.whiteShoes.name);

    shoppingCartPage
      .getShoppingCartPrice(
        productsData.blackTshirt.name,
        productsData.blackTshirt.price.toString()
      )
      .should("have.text", `$${productsData.blackTshirt.price}`);

    shoppingCartPage
      .getShoppingCartPrice(
        productsData.whiteShoes.name,
        productsData.whiteShoes.price.toString()
      )
      .should("have.text", `$${productsData.whiteShoes.price}`);

    cy.xpath('//button[text()="Show total price"]').click();

    const total =
      productsData.blackTshirt.price + productsData.whiteShoes.price;

    cy.get("#price")
      .invoke("text")
      .then((text) => {
        const precio = isNaN(text) ? 0 : parseFloat(text);
        expect(total).to.equal(precio);
      });

    checkOutPage.getButtonByText("Go to Checkout").click();
    cy.get(checkOutPage.titlePage).should("contain", "Checkout");
    checkOutPage.getButtonByText("Purchase");
    checkOutPage.completeCheckOut(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.cardNumber
    );

    cy.get("p#name", { timeout: 10000 }).should("exist");

    cy.get(reciptPage.nameRecipt).should("contain", checkoutData.firstName);
    cy.get(reciptPage.nameRecipt).should("contain", checkoutData.lastName);

    cy.get("p").eq(3).should("contain", productsData.blackTshirt.name);
    cy.get("p").eq(4).should("contain", productsData.whiteShoes.name);
    cy.get("p").eq(6).should("contain", checkoutData.cardNumber);
    cy.get("p").eq(7).should("contain", total);
  });
});
