//Node Connection to MySQL

var mysql = require ('mysql');

var pool;

if (process.env.JAWSDB_URL)
{
    pool = mysql.createConnection(process.env.JAWSDB_URL);
}
else
{
    pool = mysql.createPool(
	{
		host: 'us-cdbr-iron-east-02.cleardb.net',
		user: 'b45840ec47f61c',
		password: 'bd6c1d48',
		database: 'heroku_9343667342ca503'
	});
};

console.log("Pool created");
module.exports = pool;