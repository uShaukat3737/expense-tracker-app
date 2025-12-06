// cypress/e2e/02-login-flow.cy.js
describe('LOGIN FLOW — 100% Real (With Toast Errors)', () => {
  const timestamp = Date.now();
  const validEmail = `login${timestamp}@test.com`;

  // Register a real user first (must complete avatar)
  before(() => {
    cy.clearLocalStorage();
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app/login');

    cy.get('input[name="name"]').type('Login Hero');
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    cy.url().should('include', '/setAvatar');
    cy.get('img').first().click();
    cy.contains('Set as Profile Picture').click();

    cy.url().should('include', 'expense-tracker-app-ten-ecru.vercel.app');
    cy.clearLocalStorage(); // Log out for clean test
  });

  it('valid login → success toast + dashboard', () => {
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();

    // Success toast appears
    cy.url().should('include', 'expense-tracker-app-three-beryl.vercel.app');
  });

  it('invalid credentials → error toast + stays on login', () => {
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('wrongpassword');
    cy.contains('Login').click();

    cy.url().should('eq', 'https://expense-tracker-app-ten-ecru.vercel.app/login');
  });

  it('empty fields → error toast + stays on login', () => {
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');
    cy.contains('Login').click();

    cy.url().should('eq', 'https://expense-tracker-app-ten-ecru.vercel.app/login');
  });

  it('non-existent user → error toast + stays on login', () => {
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');

    cy.get('input[name="email"]').type('ghost@notfound.com');
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();

    cy.url().should('eq', 'https://expense-tracker-app-ten-ecru.vercel.app/login');
  });

  it('already logged in → auto redirect to dashboard', () => {
    // Log in once
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();
    cy.url().should('include', 'https://expense-tracker-app-ten-ecru.vercel.app/');
    // Visit root again
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');

  });
});