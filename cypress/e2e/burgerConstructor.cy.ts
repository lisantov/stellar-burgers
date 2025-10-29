describe('Проверяем корректность работы конструктора', () => {
  beforeEach(() => {
    cy.prepare();
  });

  describe('Конструктор корректно обрабатывает добавление ингредиентов', () => {
    it('В конструктор корректно добавляется булка', () => {
      const bunIngredientButton = cy
        .get(`[data-cy=643d69a5c3f7b9001cfa093c]`)
        .find('button');

      bunIngredientButton.click();
      cy.get(`[data-cy=bun-top]`).should('exist');
      cy.get(`[data-cy=bun-bottom]`).should('exist');
    });

    it('В конструктор корректно добавляется начинка', () => {
      const mainIngredientButton = cy
        .get(`[data-cy=643d69a5c3f7b9001cfa0941]`)
        .find('button');

      mainIngredientButton.click();

      cy.get(`[data-cy=constructor-643d69a5c3f7b9001cfa0941]`).should('exist');
    });

    it('В конструктор корректно добавляется соус', () => {
      const sauceIngredientButton = cy
        .get(`[data-cy=643d69a5c3f7b9001cfa0942]`)
        .find('button');

      sauceIngredientButton.click();

      cy.get(`[data-cy=constructor-643d69a5c3f7b9001cfa0942]`).should('exist');
    });

    it('В конструктор корректно добавляются несколько ингредиентов', () => {
      const bunIngredientButton = cy
        .get(`[data-cy=643d69a5c3f7b9001cfa093c]`)
        .find('button');
      const mainIngredientButton = cy
        .get(`[data-cy=643d69a5c3f7b9001cfa0941]`)
        .find('button');
      const sauceIngredientButton = cy
        .get(`[data-cy=643d69a5c3f7b9001cfa0942]`)
        .find('button');

      bunIngredientButton.click();
      mainIngredientButton.click();
      sauceIngredientButton.click();

      cy.get(`[data-cy=bun-top]`).should('exist');
      cy.get(`[data-cy=bun-bottom]`).should('exist');
      cy.get(`[data-cy=constructor-643d69a5c3f7b9001cfa0941]`).should('exist');
      cy.get(`[data-cy=constructor-643d69a5c3f7b9001cfa0942]`).should('exist');
    });
  });
});
