const config = require('./config');
const faker = require('faker');

const randomNum = Math.ceil(Math.random(1000) * 1000);
const fullname = faker.name.findName();
const username = `daniel${randomNum}`;
const email = faker.internet.email();

module.exports = {
  'Registers a new user': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div.login-page-wrapper')
    .click('#registerlink')
    .assert.containsText('h3#registerlabel', 'Register')
    .setValue('input[name=fullname]', fullname)
    .setValue('input[name=username]', username)
    .setValue('input[name=email]', email)
    .setValue('input#registerPassword', '123456')
    .setValue('input[name=passwordConfirmation]', '123456')
    .click('#registerbutton')
    .waitForElementVisible('div.documents-wrapper')
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .end(),

  'Returns error for incomplete fields': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div.login-page-wrapper')
    .click('#registerlink')
    .assert.containsText('h3#registerlabel', 'Register')
    .setValue('input[name=fullname]', '')
    .setValue('input[name=username]', username)
    .setValue('input[name=email]', email)
    .setValue('input#registerPassword', '123456')
    .setValue('input[name=passwordConfirmation]', '123456')
    .click('#registerbutton')
    .assert.containsText('p#fullnameError', 'Fullname is required')
    .end(),

  'Logs a user in': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div#loginform')
    .assert.containsText('h3#loginlabel', 'Login')
    .setValue('input[name=identifier]', 'memuna@haruna.com')
    .setValue('input[name=password]', 'memunat')
    .click('#loginbutton')
    .waitForElementVisible('div.documents-wrapper')
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .end(),

  'Returns error for invalid credentials': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div#loginform')
    .assert.containsText('h3#loginlabel', 'Login')
    .setValue('input[name=identifier]', 'memuna@h.com')
    .setValue('input[name=password]', 'memunat')
    .click('#loginbutton')
    .assert.containsText('div.errors h5', 'Invalid credentials')
    .end(),
};
