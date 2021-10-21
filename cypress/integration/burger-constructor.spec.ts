import "@4tw/cypress-drag-drop";

describe("service is available", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open burger constructor page by default", function () {
    cy.contains("Соберите бургер");
  });

  // Проверяем роутинг при нажатии на пункты меню
  it("should open burger constructor page when clicking on constructor in navbar", function () {
    cy.get("p").contains("Конструктор").click();
    cy.contains("Соберите бургер");
  });
  it("should open feed page when clicking on feed in navbar", function () {
    cy.get("p").contains("Лента заказов").click();
    cy.get("h1").contains("Лента заказов");
  });
  it("should open burger constructor page when clicking on burger icon in navbar", function () {
    cy.get("header > div > div > a").click();
    cy.contains("Соберите бургер");
  });
  it("should open login page when clicking on personal account in navbar", function () {
    cy.get("p").contains("Личный кабинет").click();
    cy.contains("Вход");
  });

  // Проверяем Drag-n-Drop
  it("should dragndrop", () => {
    cy.visit("http://localhost:3000");

    // Перетаскиваем краторную булку
    cy.get('section[class^="burger-ingredients_container"] > div > ul:nth-child(2) > li:nth-child(1)').drag(
      '[class^="burger-constructor_ingredients"]'
    );
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > li[class^="burger-constructor_element"]'
    ).contains("Краторная булка N-200i (верх)");
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > li:nth-child(3)'
    ).contains("Краторная булка N-200i (низ)");
    cy.get(
      "section[class^='burger-ingredients_container'] > div > ul:nth-child(2) > li:nth-child(1) > div[class^='counter_counter'] > p"
    ).contains("2");

    // Перетаскиваем соус
    cy.get('section[class^="burger-ingredients_container"] > div > ul:nth-child(4) > li:nth-child(1)').drag(
      '[class^="burger-constructor_ingredients"]'
    );
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(1)'
    ).contains("Соус Spicy-X");
    cy.get(
      "section[class^='burger-ingredients_container'] > div > ul:nth-child(4) > li:nth-child(1) > div[class^='counter_counter'] > p"
    ).contains("1");

    // Перетаскиваем начинку
    cy.get('section[class^="burger-ingredients_container"] > div > ul:nth-child(6) > li:nth-child(1)').drag(
      '[class^="burger-constructor_ingredients"]'
    );
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(2)'
    ).contains("Филе Люминесцентного тетраодонтимформа");
    cy.get(
      "section[class^='burger-ingredients_container'] > div > ul:nth-child(6) > li:nth-child(1) > div[class^='counter_counter'] > p"
    ).contains("1");

    // Заменяем булку на флюоресцентную
    cy.get('section[class^="burger-ingredients_container"] > div > ul:nth-child(2) > li:nth-child(2)').drag(
      '[class^="burger-constructor_ingredients"]'
    );
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > li[class^="burger-constructor_element"]'
    ).contains("Флюоресцентная булка R2-D3 (верх)");
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > li:nth-child(3)'
    ).contains("Флюоресцентная булка R2-D3 (низ)");
    cy.get(
      "section[class^='burger-ingredients_container'] > div > ul:nth-child(2) > li:nth-child(2) > div[class^='counter_counter'] > p"
    ).contains("2");

    // Меняем местами соус и начинку
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(1)'
    ).drag(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(2)'
    );
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(1)'
    ).contains("Филе Люминесцентного тетраодонтимформа");
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(2)'
    ).contains("Соус Spicy-X");

    // Перетаскиваем второй такой же соус
    cy.get('section[class^="burger-ingredients_container"] > div > ul:nth-child(4) > li:nth-child(1)').drag(
      '[class^="burger-constructor_ingredients"]'
    );
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(3)'
    ).contains("Соус Spicy-X");
    cy.get(
      "section[class^='burger-ingredients_container'] > div > ul:nth-child(4) > li:nth-child(1) > div[class^='counter_counter'] > p"
    ).contains("2");
  });

  // Проверяем удаление соуса при нажатии на иконку удаления
  it("should delete the ingridient when clicking on delete icon", function () {
    cy.get(
      'section[class^="burger-constructor_container"] > div[class^="burger-constructor_locked"] > ul > div > ul > li:nth-child(3) > div > span > span[class^="constructor-element__action"] > svg'
    ).click();
    cy.get(
      "section[class^='burger-ingredients_container'] > div > ul:nth-child(4) > li:nth-child(1) > div[class^='counter_counter'] > p"
    ).contains("1");
  });

  // Проверяем переход на страницу входа при нажатии на кнопку оформления заказа
  it("should open login page when clicking on order button", function () {
    cy.get("button").contains("Оформить заказ").click();
    cy.contains("Вход");
  });
});
