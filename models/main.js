// import
var orm = require('../config/orm.js');

var main = 
{

  selectAll: function(idStreet, callback)
  {
    orm.selectAll(idStreet, function(res)
    {
      callback(res);
    });
  },

  insertOne: function(burger_name, callback)
  {
    orm.insertOne(burger_name, function(res)
    {
      callback(res);
    });
  },

  updateOne: function(burger_id, callback)
  {
    orm.updateOne(burger_id, function(res)
    {
      callback(res);
    });
  }

};

module.exports = main;