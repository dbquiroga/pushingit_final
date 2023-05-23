export class CheckOut {
    constructor(){
        this.firstName = '#FirstName'
        this.lastName = '#lastName'
        this.cardNumber = '#cardNumber'
        this.titlePage = '#title'
        this.purchaseModal = '[id^="chakra-modal--body"]'
    }

    getButtonByText(text) {
        return cy.contains('button', text);
    }

    completeCheckOut(firstName,lastName,cardNumber){
        cy.get(this.firstName).type(firstName)
        cy.get(this.lastName).type(lastName)
        cy.get(this.cardNumber).type(cardNumber)

        const submitPurchaseButton = this.getButtonByText('Purchase');

        submitPurchaseButton.click();
    }
}