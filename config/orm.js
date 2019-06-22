//Import (require) connection.js into orm.js
var connection = require('../config/connection.js')




//Create the methods that will execute the necessary MySQL commands in the controllers. 
//These are the methods you will need to use in order to retrieve and store data in your database.

var orm = 
{

	//selectAll()

	selectAll: function(idStreet, callback) 
	{
		//mySQL Query
		console.log("selectAll: " + idStreet);
		connection.query('SELECT * FROM visits where ? and ?', [{id_cluster: '1'}, {id_street: idStreet}], function(err, result)
		{
			if (err) throw err;
			callback(result);
			//console.log(result);
		});
	},

	//insertOne()
	insertOne: function(burger_name, callback)
	{
		connection.query('INSERT INTO visits SET ?', 
			{	burger_name: burger_name,
				devoured: false,
			}, function(err, result)
			{
				if (err) throw err;
				callback(result);
			});
				
	},

	//updateOne()
	updateOne: function(burgerID, callback)
	{
		connection.query('UPDATE visits SET ? WHERE ?', [{devoured: true}, {id: burgerID}],
			function(err, result)
			{
				if (err) throw err;
				callback(result);
			});
	}
};


// Export the ORM object in module.exports.
module.exports = orm;