import mysql from 'mysql';

const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };

const connectDB = () => {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database:', error);
      return;
    }
    console.log('Connected to database');
  });

  return connection;
};

export default connectDB;
