module.exports = (sequelize, Sequelize) => {
  const User = sequelize.import(__dirname + "/user");
  var AddressUser = sequelize.define('address_user', {
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    street: { type: Sequelize.STRING, allowNull: true },
    houseapt: { type: Sequelize.INTEGER, notEmpty: true },
    phone: { type: Sequelize.TEXT },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  User.hasMany(AddressUser);
  AddressUser.belongsTo(User);

  return AddressUser;
};