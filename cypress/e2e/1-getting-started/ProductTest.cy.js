describe('Broccoli Test', () => {
        //Navigate to https://rahulshettyacademy.com/seleniumPractise/#/
    before(() => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    });

    it('Search for "Broccoli', () => {
        const search = '.search .search-keyword'

        //Search "Brocolli" and assert "Brocolli" product is visible in results with count 1
        cy.get(search).type('Brocolli');
        cy.get('button[type="submit"]').click();
        cy.get('.product').contains('Brocolli').should('be.visible');
        cy.get(' .product .quantity').should('contain.value', 1);

        //Click on the + icon twice and assert count is 3
        cy.get('.product .increment').click({ multiple: true }).click({ multiple: true });
        cy.get('input[class="quantity"]').should('have.value', '3');

        //Click "Add to cart button" and assert "Added" is visible on the button
        cy.get('button').contains('ADD TO CART').click().should("contain.text", '✔ ADDED');

        //Click on the cart icon in the top right corner
        cy.get('.cart .cart-icon').click();

        //Assert that Broccoli is visible on the opened overlay
        cy.get('.cart-preview .cart-items').contains('Brocolli').should('be.visible');

        //Click the "Proceed to checkout" button
        cy.get('button').contains('PROCEED TO CHECKOUT').click();

        //Assert that Brocolli is visible under the Product name column
        cy.get('#productCartTables tbody tr').invoke('text').should('include', 'Brocolli - 1 Kg');

        //Type "test" in the promo code field and wait to apply
        cy.get('input[class = "promoCode"]').type(' &nbsp;&nbsp; ');
        cy.get('.promoBtn').click();
        cy.wait(7000);

        //Assert "Invalid code ..!" validation message is visible
        cy.get('.promoInfo').should("contain.text", 'Invalid code ..!');

        //Click on the "Place Order" button
        cy.get('button').contains('Place Order').click();

        //Select country
        cy.get('.wrapperTwo select').select('Armenia').should('have.value', 'Armenia');

        //Agree to Terms and Conditions
        cy.get('.chkAgree').click();

        //Click on the "Proceed" button
        cy.get('button').contains('Proceed').click();

        //Assert "Thank you ..." message is visible
        cy.contains('Thank you').should('be.visible');


    });
});
