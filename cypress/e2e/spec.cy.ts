Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log(err);
  return false;
});

describe("Test scenario 1", () => {
  it("Opens SmartFrame 1", () => {
    cy.visit("https://smartitnow.blogspot.com/p/e.html");
    cy.get("iframe");
  });
});
