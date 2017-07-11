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

    queryInterface.bulkInsert('Users', [{
      fullname: 'Bamidele Daniel',
      email: 'greatbolutife@gmail.com',
      username: 'Bingos',
      roleId: 1,
      password: '$2a$10$meV5vnEPdcWO5Wy0YUsclu/gFoW0TOFLpWV9JdgJZN5sBYcFuZ6BC',
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
    queryInterface.bulkDelete('Users', null, {})
  )
};
