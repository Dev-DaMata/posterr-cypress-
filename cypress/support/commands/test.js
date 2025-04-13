Cypress.Commands.add('viewPosting', (take, skip) => {
  cy.request({
      method: 'GET',
      url: `https://localhost:7240/api/posting/latest?take=${take}&skip=${skip}`,
      failOnStatusCode: false,
  })
})