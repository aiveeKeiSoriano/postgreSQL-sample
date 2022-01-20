const env = require('dotenv');
env.config();

module.exports = {
	username: 'postgresqlSample',
	password: 'postgresqlSample',
	database: 'postgresqlSample',
	host: 'localhost',
	dialect: 'postgres',
	port: process.env.POSTGRES_PORT || '5342'
};