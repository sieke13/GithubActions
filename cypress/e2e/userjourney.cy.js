describe('user journey', () => {
  beforeEach(() => {
    cy.intercept({
        method: 'GET',
        url: '/api/questions/random'
      },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
    ).as('getRandomQuestion')
  });

  it('should start the quiz and display the first question', () => {
    cy.visit('/');
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should answer questions and complete the quiz', () => {
    cy.visit('/');
    cy.get('button').contains('Start Quiz').click();

    // Answer questions
    cy.get('button').contains('1').click();

    // Verify the quiz completion
    cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
  });

  it('should restart the quiz after completion', () => {
    cy.visit('/');
    cy.get('button').contains('Start Quiz').click();

    // Answer questions
    cy.get('button').contains('1').click();

    // Restart the quiz
    cy.get('button').contains('Take New Quiz').click();

    // Verify the quiz is restarted
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});