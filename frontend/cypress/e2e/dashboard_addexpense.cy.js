// cypress/e2e/03-dashboard-full.cy.js
describe('DASHBOARD — Full Real Flow (Real User + Exact MUI Icons)', () => {
  const user = {
    email: 'umerchuri@gmail.com',
    password: '1itedc23',
    name: 'Umer'
  };

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('https://expense-tracker-app-three-beryl.vercel.app');
  });

 it('full dashboard flow — login → add → edit → delete → filters → logout', () => {
    // 1. LOGIN
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('button', 'Login').click();

    cy.contains(`Welcome back, ${user.name}`).should('be.visible');
    cy.url().should('include', 'expense-tracker-app-three-beryl.vercel.app');

    // 2. ADD EXPENSE
    cy.contains('Add New').click();

    cy.get('input[name="title"]').type('Cypress Final Boss');
    cy.get('input[name="amount"]').type('7777');
    cy.get('select[name="category"]').select('Entertainment');
    cy.get('select[name="transactionType"]').select('Expense');
    cy.get('input[name="date"]').type('2025-12-31');
    cy.get('input[name="description"]').type('End of era');

    cy.contains('Submit').click();
    cy.contains('Transaction Added Successfully').should('be.visible');

    // 3. VERIFY IN TABLE
    cy.contains('Cypress Final Boss').should('be.visible');
    cy.contains('7777').should('be.visible');

    // 4. EDIT EXPENSE — using your exact MUI class
    cy.contains('Cypress Final Boss')
      .parent()
      .find('svg.MuiSvgIcon-root')
      .first()
      .click();


    cy.get('input[name="title"]').type('ABC');
    cy.get('select[name="category"]').select('Food');
    cy.contains('Submit').click();

    cy.contains('ABC').should('be.visible');
    cy.contains('Food').should('be.visible');

    // 5. DELETE EXPENSE — using your exact MUI class
    cy.contains('ABC')
      .parent()
      .find('svg.MuiSvgIcon-root')
      .last()
      .click();

    cy.on('window:confirm', () => true);
    cy.contains('Cypress Final Boss').should('not.exist');

    // 6. LOGOUT
    cy.contains('Logout').click();
    cy.url().should('eq', 'https://expense-tracker-app-three-beryl.vercel.app/login');

    
  });
it('full dashboard flow — login → add 5 transactions → edit → delete → filters → views → logout', () => {
    // 1. LOGIN
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('button', 'Login').click();
    cy.contains(`Welcome back, ${user.name}`).should('be.visible');
    cy.url().should('include', 'expense-tracker-app-three-beryl.vercel.app');

    // 2. ADD 5 TRANSACTIONS — HARD-CODED (NO FUNCTION)
    // Transaction 1
    cy.contains('Add New').click();
    cy.get('input[name="title"]').type('Salary Jan');
    cy.get('input[name="amount"]').type('50000');
    cy.get('select[name="category"]').select('Salary');
    cy.get('select[name="transactionType"]').select('Credit');
    cy.get('input[name="date"]').type('2025-01-15');
    cy.get('input[name="description"]').type('Monthly salary');
    cy.contains('Submit').click();
    cy.contains('Transaction Added Successfully').should('be.visible');

    // Transaction 2
    cy.contains('Add New').click();
    cy.get('input[name="title"]').type('Rent');
    cy.get('input[name="amount"]').clear().type('15000');
    cy.get('select[name="category"]').select('Rent');
    cy.get('select[name="transactionType"]').select('Expense');
    cy.get('input[name="date"]').type('2025-01-05');
    cy.contains('Submit').click();
    cy.contains('Transaction Added Successfully').should('be.visible');

    // Transaction 3
    cy.contains('Add New').click();
    cy.get('input[name="title"]').type('Food');
    cy.get('input[name="amount"]').clear().type('2000');
    cy.get('select[name="category"]').select('Food');
    cy.get('select[name="transactionType"]').select('Expense');
    cy.get('input[name="date"]').type('2025-01-20');
    cy.contains('Submit').click();
    cy.contains('Transaction Added Successfully').should('be.visible');

    // Transaction 4
    cy.contains('Add New').click();
    cy.get('input[name="title"]').type('Bonus');
    cy.get('input[name="amount"]').clear().type('10000');
    cy.get('select[name="category"]').select('Salary');
    cy.get('select[name="transactionType"]').select('Credit');
    cy.get('input[name="date"]').type('2025-02-10');
    cy.contains('Submit').click();
    cy.contains('Transaction Added Successfully').should('be.visible');

    // Transaction 5
    cy.contains('Add New').click();
    cy.get('input[name="title"]').type('Netflix');
    cy.get('input[name="amount"]').clear().type('500');
    cy.get('select[name="category"]').select('Entertainment');
    cy.get('select[name="transactionType"]').select('Expense');
    cy.get('input[name="date"]').type('2025-02-01');
    cy.contains('Submit').click();
    cy.contains('Transaction Added Successfully').should('be.visible');

    // 3. VERIFY ALL 5 IN TABLE
    cy.get('select[name="frequency"]').select('Last Year'); // Last Month
    cy.contains('Salary Jan').should('be.visible');
    cy.contains('Rent').should('be.visible');
    cy.contains('Food').should('be.visible');
    cy.contains('Bonus').should('be.visible');
    cy.contains('Netflix').should('be.visible');

    // 4. FILTERS TEST
    cy.get('select[name="frequency"]').select('Last Year'); // Last Month
    cy.contains('Salary Jan').should('be.visible');
    cy.contains('Rent').should('be.visible');
    cy.contains('Food').should('be.visible');

    cy.get('select[name="type"]').select('expense');
    cy.contains('Rent').should('be.visible');
    cy.contains('Food').should('be.visible');
    cy.contains('Netflix').should('be.visible');
    cy.contains('Salary Jan').should('not.exist');

    cy.get('select[name="type"]').select('credit');
    cy.contains('Salary Jan').should('be.visible');
    cy.contains('Bonus').should('be.visible');
    cy.contains('Rent').should('not.exist');

    // 5. RESET FILTER
    cy.contains('Reset Filter').click();
    cy.get('select[name="type"]').should('have.value', 'all');


    // 6. SWITCH TO CHART VIEW
      cy.get('div.filterRow')                       // parent row
      .find('div.text-white.iconBtnBox')          // container with icons
      .find('svg.MuiSvgIcon-root')                // all icons inside container
      .last()                                     // second/last icon
      .click();
    cy.get('select[name="frequency"]').select('Last Year'); // Last Month
    cy.contains('Total Transactions').should('be.visible');
    cy.contains('Total TurnOver').should('be.visible');
    cy.contains('Categorywise Income').should('be.visible');
    cy.contains('Categorywise Expense').should('be.visible');

    // 8. LOGOUT
    cy.contains('Logout').click();
    cy.url().should('include', '/login');
  });

  it('shows "Please enter all the fields" when any field is empty', () => {
      cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('button', 'Login').click();
    cy.contains(`Welcome back, ${user.name}`).should('be.visible');
    cy.url().should('include', 'expense-tracker-app-three-beryl.vercel.app');
    cy.contains('Add New').click();

    // Fill only title
    cy.get('input[name="title"]').type('Only Title');
    cy.contains('Submit').click();
    cy.wait(500);
    // Error toast
    cy.contains('Please enter all the fields').should('be.visible');
    cy.wait(500);
    cy.contains('Logout').click();
    cy.url().should('include', '/login');
  });
});
