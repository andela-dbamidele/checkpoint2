const config = require('./config');
const faker = require('faker');

const title = faker.lorem.words(5);

module.exports = {
  'Create a new document': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .pause(500)
    .click('#getStarted')
    .waitForElementVisible('div#loginform')
    .pause(500)
    .assert.containsText('h3#loginlabel', 'Login')
    .setValue('input[name=identifier]', 'memuna@haruna.com')
    .pause(500)
    .setValue('input[name=password]', 'memunat')
    .pause(500)
    .click('#loginbutton')
    .waitForElementVisible('div.documents-wrapper')
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .click('#openModal')
    .waitForElementVisible('div#modal1')
    .pause(500)
    .setValue('input[name=title]', title)
    .pause(500)
    .click('select.browser-default')
    .pause(1000)
    .click('option[value="2"]')
    .click('.mce-i-codesample')
    .pause(500)
    .setValue('.mce-textbox', faker.lorem.paragraphs())
    .pause(500)
    .click('.mce-floatpanel .mce-panel .mce-container-body button')
    .pause(1000)
    .click('#saveDocument')
    .pause(500)
    .waitForElementVisible('.swal2-container')
    .pause(3000)
    .click('.swal2-confirm')
    .pause(1000),

  'Throw error for duplicate title': browser =>
  browser
    .url(`${config.url}/documents`)
    .waitForElementVisible('div.documents-wrapper')
    .pause(1000)
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .click('#openModal')
    .waitForElementVisible('div#modal1')
    .pause(1000)
    .setValue('input[name=title]', title)
    .pause(500)
    .click('select option[value="1"]')
    .pause(500)
    .click('.mce-i-codesample')
    .pause(500)
    .setValue('.mce-textbox', faker.lorem.paragraphs())
    .pause(500)
    .click('.mce-floatpanel .mce-panel .mce-container-body button')
    .pause(500)
    .click('#saveDocument')
    .pause(500)
    .waitForElementVisible('.swal2-container')
    .pause(500)
    .assert
    .containsText('.swal2-content',
      'Document with the same title already exist')
    .click('.swal2-confirm')
    .pause(1000),

  'Deletes a single document': browser =>
  browser
    .url(`${config.url}/documents`)
    .waitForElementVisible('body')
    .waitForElementVisible('div.documents-wrapper')
    .pause(500)
    .assert.containsText('p.currentFilter', 'Showing Public documents')
    .click('select#access option[value="1"]')
    .pause(500)
    .assert.containsText('p.currentFilter', 'Showing Private documents')
    .click('#DocumentCard')
    .waitForElementVisible('.single-document-wrapper')
    .pause(500)
    .click('#deleteDocument')
    .pause(500)
    .waitForElementVisible('.swal2-container')
    .pause(1000)
    .assert
    .containsText('.swal2-content',
      'You won\'t be able to recover the document')
    .click('.swal2-confirm')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000)
    .end()
};
