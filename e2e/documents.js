const config = require('./config');
const faker = require('faker');

const title = faker.lorem.words(5);

module.exports = {
  'Create a new document': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div#loginform')
    .assert.containsText('h3#loginlabel', 'Login')
    .setValue('input[name=identifier]', 'memuna@haruna.com')
    .setValue('input[name=password]', 'memunat')
    .pause(1000)
    .click('#loginbutton')
    .waitForElementVisible('div.documents-wrapper')
    .pause(1000)
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .click('#openModal')
    .waitForElementVisible('div#modal1')
    .pause(1000)
    .setValue('input[name=title]', title)
    .click('select.browser-default')
    .pause(1000)
    .click('option[value="2"]')
    .click('.mce-i-codesample')
    .setValue('.mce-textbox', faker.lorem.paragraphs())
    .click('.mce-floatpanel .mce-panel .mce-container-body button')
    .pause(3000)
    .click('#saveDocument')
    .pause(1000)
    .waitForElementVisible('.swal2-container')
    .pause(3000)
    .click('.swal2-confirm')
    .pause(1000)
    .end(),

  'Throw error for duplicate title': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div#loginform')
    .assert.containsText('h3#loginlabel', 'Login')
    .setValue('input[name=identifier]', 'memuna@haruna.com')
    .setValue('input[name=password]', 'memunat')
    .pause(1000)
    .click('#loginbutton')
    .waitForElementVisible('div.documents-wrapper')
    .pause(1000)
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .click('#openModal')
    .waitForElementVisible('div#modal1')
    .pause(1000)
    .setValue('input[name=title]', title)
    .click('select option[value="1"]')
    .click('.mce-i-codesample')
    .setValue('.mce-textbox', faker.lorem.paragraphs())
    .click('.mce-floatpanel .mce-panel .mce-container-body button')
    .pause(1000)
    .click('#saveDocument')
    .pause(1000)
    .waitForElementVisible('.swal2-container')
    .pause(1000)
    .assert
    .containsText('.swal2-content',
      'Document with the same title already exist')
    .click('.swal2-confirm')
    .pause(1000)
    .end(),

  'Deletes a single document': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .click('#getStarted')
    .waitForElementVisible('div#loginform')
    .assert.containsText('h3#loginlabel', 'Login')
    .setValue('input[name=identifier]', 'memuna@haruna.com')
    .setValue('input[name=password]', 'memunat')
    .pause(1000)
    .click('#loginbutton')
    .waitForElementVisible('div.documents-wrapper')
    .pause(1000)
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .click('select#access option[value="1"]')
    .pause(1000)
    .assert.containsText('p.currentFilter', 'Showing Private documents')
    .click('#singledoc')
    .waitForElementVisible('.single-document-wrapper')
    .pause(1000)
    .click('#deleteDocument')
    .pause(1000)
    .waitForElementVisible('.swal2-container')
    .pause(1000)
    .assert
    .containsText('.swal2-content',
      'You won\'t be able to recover the document')
    .click('.swal2-confirm')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(3000)
    .end()
};
