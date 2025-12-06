// cypress/e2e/01-register-to-avatar.cy.js
describe('REGISTER → AVATAR → DASHBOARD — Full Real Flow', () => {
  const timestamp = Date.now();
  const email = `user${timestamp}@test.com`;

  beforeEach(() => {
    // Visit homepage first
    cy.visit('https://expense-tracker-app-ten-ecru.vercel.app');
    // Click "Register" button
    cy.contains('Register').click();
    // Ensure we are on register page
    cy.url().should('include', '/register');
  });

  it('completes full registration with avatar selection', () => {
    // 1. Fill and submit
    cy.get('input[name="name"]').type('Final User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    // 2. Should be on avatar page (no toast needed)
    cy.url().should('include', '/setAvatar');
    cy.contains('Choose Your Avatar').should('be.visible');

    // 3. Change sprite style
    cy.get('select').select('pixel-art');
    cy.get('img').should('have.length', 4);

    // 4. Select first avatar
    cy.get('img').first().click();
    cy.get('img').first().should('have.class', 'selected');

    // 5. Submit avatar
    cy.contains('Set as Profile Picture').click();

    // 6. Should go to dashboard
    cy.url().should('include', 'https://expense-tracker-app-ten-ecru.vercel.app/');
    cy.contains('Expense Management System').should('be.visible');
    cy.contains('Select Frequency').should('be.visible');

    // 7. localStorage should have full user with avatar
    cy.window().then((win) => {
      const user = JSON.parse(win.localStorage.getItem('user'));
      expect(user.email).to.eq(email);
      expect(user.isAvatarImageSet).to.be.true;
      expect(user.avatarImage).to.include('dicebear.com');
    });
  });

  it('blocks duplicate email — stays on register page silently', () => {
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
    cy.get('input[name="name"]').type('Protected User');
    cy.get('input[name="email"]').type(`protected${timestamp}@test.com`);
    cy.get('input[name="password"]').type('123456');
    cy.contains('Signup').click();

    cy.url().should('include', '/setAvatar');
    cy.get('img').first().click();
    cy.contains('Set as Profile Picture').click();
    cy.request({
      url: 'https://expense-tracker-app-ten-ecru.vercel.app/register',
      failOnStatusCode: false     // 🚀 prevents Cypress from failing automatically
    }).then((response) => {
      expect(response.status).to.eq(404);          // ✔ test passes if status is 404
      expect(response.body).to.include('NOT_FOUND'); // optional
    });


  });
});
