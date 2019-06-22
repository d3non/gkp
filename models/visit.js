module.exports = (sequelize, Sequelize) => {
  var Visit = sequelize.define('visit', {
    id_visit: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    id_cluster: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER },
    id_street: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER },
    house_number: { autoIncrement: false, primaryKey: false, type: Sequelize.INTEGER },
    visit_fname: { type: Sequelize.STRING, notEmpty: true },
    visit_lname: { type: Sequelize.STRING, notEmpty: true },
    car_make: { type: Sequelize.TEXT },
    car_model: { type: Sequelize.TEXT },
    car_color: { type: Sequelize.TEXT },
    car_plates: { type: Sequelize.STRING },
    visit_date: { type: Sequelize.DATE },
    checkin_date: { type: Sequelize.DATE },
    checkout_date: { type: Sequelize.DATE },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  return Visit;
};