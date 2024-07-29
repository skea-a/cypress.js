import * as data from "../helpers/default_data.json"

describe('Автотесты для формы логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('be.visible'); // Кнопка "забыли пароль?" на месте и видна
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Кнопка "забыли пароль?" синего цвета
          });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и его видно
        cy.get('.link').should('be.visible'); // Есть надпись снизу и ее видно
          });
        
    it('1. Позитивный кейс авторизации', function () {

         cy.get('#mail').type(data.login); // Ввели верный логин
         cy.get('#pass').type(data.password); // Ввели верный пароль
         cy.get('#loginButton').click(); // Нажал войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авторизации появляется текст
         cy.get('#messageHeader').should('be.visible'); // Этот текст видно пользователю
    })

    it('2. Проверка логики восстановления пароля', function () {
    
        cy.get('#forgotEmailButton').click(); // Нажал на кнопку "забыли пароль?"

        cy.get('#mailForgot').type('pashka@mail.ru'); // Ввели верный логин
        cy.get('#restoreEmailButton').click(); // Нажал на "Отправить код"

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Есть надпись об отправке сообщения на почту
        cy.get('#messageHeader').should('be.visible'); // Эту надпись видно
    })

    it('3. Негативный кейс авторизации (пароль неправильный)', function () {

        cy.get('#mail').type(data.login); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio2'); // Ввели неверный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации появляется текст
        cy.get('#messageHeader').should('be.visible'); // Этот текст видно пользователю
    })

    it('4. Негативный кейс авторизации (логин неправильный)', function () {

        cy.get('#mail').type('pavel@dolnikov.ru'); // Ввели неверный логин
        cy.get('#pass').type(data.password); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации появляется текст
        cy.get('#messageHeader').should('be.visible'); // Этот текст видно пользователю
    })

    it('5. Негативный кейс валидации (без @)', function () {

        cy.get('#mail').type('germandolnikov.ru'); // Ввели невалидный логин
        cy.get('#pass').type(data.password); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации появляется текст
        cy.get('#messageHeader').should('be.visible'); // Этот текст видно пользователю
    })

    it('6.  Приведение к строчным буквам в логине', function () {

        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type(data.password); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авторизации появляется текст
        cy.get('#messageHeader').should('be.visible'); // Этот текст видно пользователю
    })

 }) 


 describe('Покемоны, покупка аватара', function () {                             
    it('e2e тест на покупку нового аватара для тренера', function () {   
         cy.visit('https://pokemonbattle.ru/');                          // Зайти на сайт
         cy.get('input[type="email"]').type('YOUR_LOGIN'); // Ввести правильный логин
         cy.get('input[type="password"]').type('YOUR_PASSWORD'); // Ввести правильный пароль
         cy.get('button[type="submit"]').click(); // Нажать кнопку "Подтвердить"
         cy.get('.header__btns > :nth-child(4)').click(); // Нажать кнопку "Магазин"
         cy.get('.available > button').first().click(); // Кликнуть по кнопке "Купить" у первого доступного аватара
         cy.get('.credit').type('4620869113632996'); // Ввести валидный номер карты
         cy.get('.k_input_ccv').type('125'); // Ввести валидный CVV карты
         cy.get('.k_input_date').type('1225'); // Ввести срок действия карты
         cy.get('.k_input_name').type('IVANOV IVAN'); // Ввести имя владельца действия карты
         cy.get('.pay-btn').click(); // Нажать кнопку "Оплатить"
         cy.get('#cardnumber').type('56456'); // Ввести код подтверждения СМС
         cy.get('.payment__submit-button').click(); // Нажать кнопку "Отправить"
         cy.contains('Покупка прошла успешно').should('be.visible'); // Проверить наличие надписи и ее видимость
     });
 });