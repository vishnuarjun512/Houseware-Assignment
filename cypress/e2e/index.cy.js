const newTodo = () => {
  cy.get(`[data-testid="text-input"]`)
    .should("exist")
    .type("Gym at 5pm{enter}")
    .wait(2000);
};

beforeEach(() => {
  cy.visit("http://localhost:3000/");
});

describe("Header Component", () => {
  it("Checking Header Preseent", () => {
    cy.get('[data-testid="header"]').should("exist");
  });
});

describe("Main Component", () => {
  it("Checking for Header and Input", () => {
    cy.get('[data-testid="header"]').should("exist");
    cy.get(`[data-testid="text-input"]`).should("exist");
    cy.get(`[data-testid="text-input"]`)
      .should("exist")
      .type("Gym at 5pm")
      .should("have.value", "Gym at 5pm");
  });

  it("Creating a New Todo", () => {
    newTodo();
  });

  const desiredItemIndex = 0;
  it("Marking Todo Done", () => {
    newTodo();
    cy.get('[data-testid="main"]')
      .find(
        `[data-testid="todo-item"]:eq(${desiredItemIndex}) [data-testid="todo-item-toggle"]`
      )
      .should("exist")
      .check();
  });

  it("Deleting Completed Todo", () => {
    newTodo();
    cy.get('[data-testid="main"]')
      .find(
        `[data-testid="todo-item"]:eq(${desiredItemIndex}) [data-testid="todo-item-toggle"]`
      )
      .should("exist")
      .check();
    cy.get('[data-testid="main"]')
      .find(`[data-testid="todo-item"]:eq(${desiredItemIndex})`)
      .trigger("mouseover");

    cy.get('[data-testid="main"]')
      .find(
        `[data-testid="todo-item"]:eq(${desiredItemIndex}) [data-testid="todo-item-button"]`
      )
      .should("exist")
      .click({ force: true });
  });
});

describe("Footer Component", () => {
  it("Checking Footer Preseent", () => {
    newTodo();
    cy.get('[data-testid="footer"]').should("exist");
  });

  it("Toggling through Footer Categories", () => {
    newTodo();
    cy.get('[data-testid="footer"]').should("exist");
    cy.get('[href="#/active"]').should("exist").click();
  });
});
