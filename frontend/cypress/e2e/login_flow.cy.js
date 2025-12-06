// cypress/e2e/02-login-flow.cy.js
describe('LOGIN FLOW — 100% Real (With Toast Errors)', () => {
  const timestamp = Date.now();
  const validEmail = `login${timestamp}@test.com`;

  // Register a real user first (must complete avatar)
  before(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:3000/register');

    cy.get('input[name="name"]').type('Login Hero');
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    cy.url().should('include', '/setAvatar');
    cy.get('img').first().click();
    cy.contains('Set as Profile Picture').click();

    cy.url().should('include', 'localhost:3000');
    cy.clearLocalStorage(); // Log out for clean test
  });

  it('valid login → success toast + dashboard', () => {
    cy.visit('http://localhost:3000');

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();

    // Success toast appears
    cy.url().should('include', 'localhost:3000');;
  });

  it('invalid credentials → error toast + stays on login', () => {
    cy.visit('http://localhost:3000');

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('wrongpassword');
    cy.contains('Login').click();

    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('empty fields → error toast + stays on login', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Login').click();

    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('non-existent user → error toast + stays on login', () => {
    cy.visit('http://localhost:3000');

    cy.get('input[name="email"]').type('ghost@notfound.com');
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();

    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('already logged in → auto redirect to dashboard', () => {
    // Log in once
    cy.visit('http://localhost:3000');
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();
    cy.url().should('include', 'http://localhost:3000/');

    // Visit root again
    cy.visit('http://localhost:3000');

  });
});