export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users'
    });
    Role.hasMany(models.Document, {
      foreignKey: 'roleId',
      as: 'documents'
    });
  };
  return Role;
};
