Cypress.Commands.add('createRepost', (body) => {
    cy.request({
        method: 'POST',
        url: 'https://localhost:7240/api/posting/repost',
        body: body,
        failOnStatusCode: false,
    })
})