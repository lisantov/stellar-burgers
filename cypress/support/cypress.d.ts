declare global {
  namespace Cypress {
    interface Chainable {
      prepare(): void;
    }
  }
}

export {};
