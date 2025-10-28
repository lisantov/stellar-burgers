describe('Проверяем корректность работы конструктора', () => {
  it('Сервис должен быть доступен по адресу localhost:4000', () => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: '../mocks/ingredients.json'
    });
    cy.visit('http://localhost:4000/');
  });

  describe('Конструктор корректно обрабатывает добавление ингредиентов', () => {
    it('В конструктор корректно добавляется булка', () => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: '../mocks/ingredients.json'
      });
      cy.visit('http://localhost:4000/');
      const bunButton = cy.get(`[data-cy=bun1]`);
      bunButton.click();
      const bunTop = cy.get(`[data-cy=bun-top]`);
      const bunBottom = cy.get(`[data-cy=bun-bottom]`);
      bunTop.contains('Краторная булка N-200i (верх)');
      bunBottom.contains('Краторная булка N-200i (низ)');
    });

    it('В конструктор корректно добавляется начинка', () => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: '../mocks/ingredients.json'
      });
      cy.visit('http://localhost:4000/');
      const mainButton = cy.get(`[data-cy=main1]`);
      const ingredientsList = cy.get(`[data-cy=ingredients]`);
      mainButton.click();
      ingredientsList.contains('Биокотлета из марсианской Магнолии');
    });

    it('В конструктор корректно добавляется соус', () => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: '../mocks/ingredients.json'
      });
      cy.visit('http://localhost:4000/');
      const sauceButton = cy.get(`[data-cy=sauce1]`);
      const ingredientsList = cy.get(`[data-cy=ingredients]`);
      sauceButton.click();
      ingredientsList.contains('Соус Spicy-X');
    });

    // it('В конструктор корректно добавляются все ингредиенты', () => {
    //   cy.visit('http://localhost:4000/');
    //
    //   const bunButton = cy.get(`[data-cy=bun1]`);
    //   const mainButton = cy.get(`[data-cy=main1]`);
    //   const sauceButton = cy.get(`[data-cy=sauce1]`);
    //   bunButton.click();
    //   mainButton.click();
    //   sauceButton.click();
    // });
  });
});
