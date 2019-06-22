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
		user: 'bd973a01a0abbc',
		password: 'bd2ce921',
		database: 'heroku_6b3c7e799dbaffb'
	});
};


/*pool.connect(function(err) 
{
  if (err) 
  {
    console.error('error connecting: ' + err.stack);
    return;
  };
  console.log('connected as id ' + connection.threadId);
});*/

module.exports = pool;