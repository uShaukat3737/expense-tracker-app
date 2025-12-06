// cypress/e2e/01-register-to-avatar.cy.js
describe('REGISTER → AVATAR → DASHBOARD — Full Real Flow', () => {
  const timestamp = Date.now();
  const email = `user${timestamp}@test.com`;

  it('completes full registration with avatar selection', () => {
    // 1. Go to register page
    cy.visit('http://localhost:3000/register');

    // 2. Fill and submit
    cy.get('input[name="name"]').type('Final User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    // 3. Should be on avatar page (no toast needed)
    cy.url().should('include', '/setAvatar');
    cy.contains('Choose Your Avatar').should('be.visible');

    // 4. Change sprite style
    cy.get('select').select('pixel-art');
    cy.get('img').should('have.length', 4);

    // 5. Select first avatar
    cy.get('img').first().click();
    cy.get('img').first().should('have.class', 'selected');

    // 6. Submit avatar
    cy.contains('Set as Profile Picture').click();

    // 7. Should go to dashboard
    cy.url().should('include', 'http://localhost:3000/');
    cy.contains('Expense Management System').should('be.visible');
    cy.contains('Select Frequency').should('be.visible');

    // 8. localStorage should have full user with avatar
    cy.window().then((win) => {
      const user = JSON.parse(win.localStorage.getItem('user'));
      expect(user.email).to.eq(email);
      expect(user.isAvatarImageSet).to.be.true;
      expect(user.avatarImage).to.include('dicebear.com');
    });
  });

  it('blocks duplicate email — stays on register page silently', () => {
    cy.visit('https://expense-tracker-app-three-beryl.vercel.app/register');

    cy.get('input[name="name"]').type('Duplicate User');
    cy.get('input[name="email"]').type(email); // same email
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    // No redirect — stays on register
    cy.url().should('include', '/register');
    cy.url().should('not.include', '/setAvatar');

    // No toast, no error — just silent block (your real behavior)
    cy.contains('Choose Your Avatar').should('not.exist');
  });

  it('blocks direct access to /register when logged in (Fails)', () => {
    // First complete registration
    cy.visit('https://expense-tracker-app-three-beryl.vercel.app/register');
    cy.get('input[name="name"]').type('Protected User');
    cy.get('input[name="email"]').type(`protected${timestamp}@test.com`);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    cy.url().should('include', '/setAvatar');
    cy.get('img').first().click();
    cy.contains('Set as Profile Picture').click();

    // Now try to go back to register
    cy.visit('https://expense-tracker-app-three-beryl.vercel.app/register');
    cy.url().should('not.include', '/register');
    cy.url().should('include', 'https://expense-tracker-app-three-beryl.vercel.app/');
  });
});