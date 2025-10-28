describe('Проверяем корректность создание заказа', () => {
  beforeEach(() => {
    cy.prepare();
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.setCookie('accessToken', 'mockAccessToken');
  });

  it('Собираем бургер и отправляем заказ', () => {
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    });

    cy.get(`[data-cy=643d69a5c3f7b9001cfa093c] button`).click();
    cy.get(`[data-cy=643d69a5c3f7b9001cfa0941] button`).click();
    cy.get(`[data-cy=643d69a5c3f7b9001cfa0942] button`).click();

    const bunTop = cy.get(`[data-cy=bun-top]`);
    const bunBottom = cy.get(`[data-cy=bun-bottom]`);
    const mainIngredient = cy.get(
      `[data-cy=constructor-643d69a5c3f7b9001cfa0941]`
    );
    const sauceIngredient = cy.get(
      `[data-cy=constructor-643d69a5c3f7b9001cfa0942]`
    );

    bunTop.should('exist');
    bunBottom.should('exist');
    mainIngredient.should('exist');
    sauceIngredient.should('exist');

    cy.get(`[data-cy=order-button]`).click();

    const orderModal = cy.get(`[data-cy=order-15782]`);

    orderModal.should('exist');

    cy.get(`[data-cy=modal-close]`).click();

    orderModal.should('not.exist');

    bunTop.should('not.exist');
    bunBottom.should('not.exist');
    mainIngredient.should('not.exist');
    sauceIngredient.should('not.exist');
  });
});
