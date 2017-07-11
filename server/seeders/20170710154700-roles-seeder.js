'use strict';

module.exports = {
  up: queryInterface => (
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    queryInterface.bulkInsert('Roles', [{
      name: 'Administrator',
      description: 'This is the admin role',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Regular',
      description: 'This is the regular role',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  ),

  down: queryInterface => (
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('Roles', null, {})
  )
};
