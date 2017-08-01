# DOCUNIA &trade;
[![Code Climate](https://codeclimate.com/github/andela-dbamidele/checkpoint2/badges/gpa.svg)](https://codeclimate.com/github/andela-dbamidele/checkpoint2)
[![Issue Count](https://codeclimate.com/github/andela-dbamidele/checkpoint2/badges/issue_count.svg)](https://codeclimate.com/github/andela-dbamidele/checkpoint2)
[![Build Status](https://travis-ci.org/andela-dbamidele/checkpoint2.svg?branch=master)](https://travis-ci.org/andela-dbamidele/checkpoint2)
[![Coverage Status](https://coveralls.io/repos/github/andela-dbamidele/checkpoint2/badge.svg?branch=master)](https://coveralls.io/github/andela-dbamidele/checkpoint2?branch=master)
[![codecov](https://codecov.io/gh/andela-dbamidele/checkpoint2/branch/master/graph/badge.svg)](https://codecov.io/gh/andela-dbamidele/checkpoint2)

## Introduction
*  **`Docunia`** is a modern document managing app build on react-redux.
*  It has the following features;
  *  Users can sign up and sign in with a unique username and email
  *  User's can create, view, edit and delete documents
  *  It allows users to search for a particular document by title
  *  Pagination is added to allow for easy accessing of documents
*  A demo of the app can be access on heroku via [here](https://docunia.herokuapp.com)

## Dependencies

### Development Dependencies
*  The following depencies are required by the app during developmment
  *  **[Babel-register](https://www.npmjs.com/package/babel-register)** - This framework helps to compile from es6 to es5
  *  **[css-loader](https://www.npmjs.com/package/css-loader)** - The  css-loader is used with webpack and it interprets @import and url() like import/require()
  *  **[enzyme](https://www.npmjs.com/package/enzyme)** - Enzyme is used together with mocha, chai and expect.js to test this application
  *  **[eslint](https://www.npmjs.com/package/eslint)** - This is a javascript syntax highlighter used to highligh syntax error during the development of this app
  *  **[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)** - It's used to move all the css imported into the application into a separate file.
  *  **[file-loader](https://www.npmjs.com/package/file-loader)** - It enables the app to load files directly into scripts
  *  **[jsdom](https://www.npmjs.com/package/jsdom)**, **[jsdom-global](https://www.npmjs.com/package/jsdom-global)**, **[mocha-jsdom](https://www.npmjs.com/package/mocha-jsdom)**, **[mock-local-storage](https://www.npmjs.com/package/mock-local-storage)** - Used to emulate web browser during application testing
  *  **[node-sass](https://www.npmjs.com/package/node-sass)**, **[sass-loader](https://www.npmjs.com/package/sass-loader)** - This enables the app to use sass (.scss) directly in scripts
  *  **[nyc](https://www.npmjs.com/package/nyc)** - Used with mocha for test coverage report
  *  **[sinon](https://www.npmjs.com/package/sinon)** - Used with mocha and enzyme for mocking React components during test
  *  **[url-loader](https://www.npmjs.com/package/url-loader)** - It enables the app to use background images in the scss files
  *  **[webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware)** - Serves files to server during development
  *  **[webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)** - It enables the browser to reload automatically when changes are made to the app

### Dependencies
*  **[axios](https://www.npmjs.com/package/axios)** - Used to make GET requests to external API's
*  **[babel-cli](https://www.npmjs.com/package/babel-cli)** - It enables the app scripts to be tested with babel from the command line
*  **[babel-core](https://www.npmjs.com/package/babel-core)** - It compiles es6 used in the app to es5
*  **[babel-eslint](https://www.npmjs.com/package/babel-eslint)** - Used with ESlint to lint syntax errors
*  **[babel-loader](https://www.npmjs.com/package/babel-loader)** - Used with Webpack to transpile javascript codes
*  **[babel-plugin-react-html-attrs](https://www.npmjs.com/package/babel-plugin-react-html-attrs)** - It help convert JSX `class` attribute into `className` 
*  **[bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)** - Used to hash user's password before saving to the database
*  **[body-parser](https://www.npmjs.com/package/body-parser)** - Enables the app to get params from request body
*  **[chai](https://www.npmjs.com/package/chai)** - Asscertion library used for the backend testing
*  **[chai-http](https://www.npmjs.com/package/chai-http)** - Used to make server request during testing
*  **[coveralls](https://www.npmjs.com/package/coveralls)** - Display test coverage
*  **[express](https://www.npmjs.com/package/express)** - Used as the web server for this application
*  **[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)** - Moves the app's css into a separate file
*  **[history](https://www.npmjs.com/package/history)** - Allows the app to implement history in routes.
*  **[json-loader](https://www.npmjs.com/package/json-loader)** - Enables the app to inport json files.
*  **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - Enables the app to implement JWT authentication.
*  **[lodash](https://www.npmjs.com/package/lodash)** - Used to perform filter on objects
*  **[pg](https://www.npmjs.com/package/pg)**, **[pg-hstore](https://www.npmjs.com/package/pg-hstore)**, **[sequelize](https://www.npmjs.com/package/sequelize)** - Used to create database models and for performing database operations
*  **[react](https://www.npmjs.com/package/react)** - Used with **[react-dom](https://www.npmjs.com/package/react-dom)** enables the app to use the React architecture
*  **[react-paginate](https://www.npmjs.com/package/react-paginate)** - Used to implement pagination on documents and usesr's page
*  **[react-redux](https://www.npmjs.com/package/react-redux)** - Enables the app to implement the redux architecture in the react way
*  **[react-router-dom](https://www.npmjs.com/package/react-router-dom)** - Used to perform app routing
*  **[redux](https://www.npmjs.com/package/redux)** - The architecture library that the app is build on
*  **[redux-thunk](https://www.npmjs.com/package/redux-thunk)** - Enables the app to make axios request using the redux implementation
*  **[validator](https://www.npmjs.com/package/validator)** - Used to validate user input during server request
*  **[webpack](https://www.npmjs.com/package/react-router-dom)** - Used to bundle the app's js and scss files for usage in the browser
*  **[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)** - Serves as the server during development
*  **[query-string](https://www.npmjs.com/package/query-string)** - Used to get query params from props created by react-router-dom
## Front End Dependencies
*  **[Materialize CSS](http://materializecss.com/)** - All part of the app was styled with this css framework.
*  **[Material Icons](https://material.io/icons/)** - Iconic font provided by Google.
*  **[sweetalert2](https://www.npmjs.com/package/sweetalert2)** - Used to display colorful alert boxes to users.

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    >`git clone git@github.com:andela-dbamidele/checkpoint2.git`

  *  Using HTTP;

    >`git clone https://github.com/andela-dbamidele/checkpoint2.git`

*  Navigate to the repo's folder on your computer
  *  `cd checkpoint2/`
*  Install the app's dependencied
  *  `npm install`
* Run the app
  *  `npm start`

## Tests
*  The client side test have been written using Jest and Enzyme.
*  The server side test are witten with mocha and chai backed with supertest and chai-http
*  They are run using the **`coverage`** tool in order to generate test coverage reports.
*  To run the tests, navigate to the project's root folder
*  Run the following commands.
  *  `npm test`
  

## How to contribute
To contribute, fork this repo to your private repository and follow the wiki conventions on branch naming, commit messages and pull request.

## Limitations
This app and its functions are limited by the time constraint.

### Troubleshooting & FAQ
Not available at the moment

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

