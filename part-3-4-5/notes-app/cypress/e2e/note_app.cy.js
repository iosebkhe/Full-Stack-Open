describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'password'
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  //fails because it can not find the text
  // it('front page contains random text', function () {
  //   cy.contains('wtf is this app?');
  // });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('user can login', function () {
    cy.login({ username: "root", password: "password" });

    cy.contains("Superuser logged in");
  });

  it("log in fails with wrong password", function () {
    cy.contains('log in').click();
    cy.get('#username').type('root');
    cy.get('#password').type('password-1');
    cy.get("#login-button").click();

    // then tests that involve, for example, border-style, border-radius and
    // padding, will fail in Firefox:
    cy.get(".error")
      .should("contain", "invalid username or password")
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.contains("Superuser logged in").should('not.exist');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "password" });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe("and several note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it("one of those can be made important", function () {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get("@theButton")
          .click();

        cy.get('@theButton')
          .should('contain', 'make not important');
      });
    });
  });
});