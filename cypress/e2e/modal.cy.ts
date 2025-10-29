describe('Проверяем корректность работы модальных окон', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('Модальное окно открывается c нужным ингредиентом и закрывается по нажатию на крестик', () => {
    const ingredientModalButton = cy.get(
      `[data-cy=modalButton-643d69a5c3f7b9001cfa093c]`
    );

    ingredientModalButton.click();

    const modal = cy.get(`[data-cy=modal-643d69a5c3f7b9001cfa093c]`);
    modal.should('exist');

    const ingredientName = cy.get(
      '[data-cy=ingredient-643d69a5c3f7b9001cfa093c]'
    );
    ingredientName.should('exist');
    ingredientName.contains('Краторная булка N-200i');

    const closeIcon = cy.get(`[data-cy=modal-close]`);
    closeIcon.click();

    modal.should('not.exist');
  });

  it('Модальное окно открывается c нужным ингредиентом и закрывается по нажатию на оверлей', () => {
    const ingredientModalButton = cy.get(
      `[data-cy=modalButton-643d69a5c3f7b9001cfa093c]`
    );

    ingredientModalButton.click();

    const modal = cy.get(`[data-cy=modal-643d69a5c3f7b9001cfa093c]`);
    modal.should('exist');

    const ingredientName = cy.get(
      '[data-cy=ingredient-643d69a5c3f7b9001cfa093c]'
    );
    ingredientName.should('exist');
    ingredientName.contains('Краторная булка N-200i');

    const overlay = cy.get(`[data-cy=modal-overlay]`);

    overlay.click({ force: true });

    modal.should('not.exist');
  });

  it('Модальное окно открывается c нужным ингредиентом и закрывается по нажатию на Esc', () => {
    const ingredientModalButton = cy.get(
      `[data-cy=modalButton-643d69a5c3f7b9001cfa093c]`
    );

    ingredientModalButton.click();

    cy.get(`[data-cy=modal-643d69a5c3f7b9001cfa093c]`).should('exist');

    const ingredientName = cy.get(
      '[data-cy=ingredient-643d69a5c3f7b9001cfa093c]'
    );
    ingredientName.should('exist');
    ingredientName.contains('Краторная булка N-200i');

    cy.get('body').type('{esc}', { force: true });

    cy.get(`[data-cy=modal-643d69a5c3f7b9001cfa093c]`).should('not.exist');
  });
});
