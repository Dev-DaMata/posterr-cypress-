Cypress.Commands.add('createPosting', (body) => {
    cy.request({
        method: 'POST',
        url: 'https://localhost:7240/api/posting/new',
        body: body,
        failOnStatusCode: false,
    })
  })