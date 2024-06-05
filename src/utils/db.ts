// mysql
// import mysql from 'mysql';

// const dbConfig = {
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//   };

// const connectDB = () => {
//   const connection = mysql.createConnection(dbConfig);

//   connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to database:', error);
//       return;
//     }
//     console.log('Connected to database');
//   });

//   return connection;
// };

// export default connectDB;

// firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQLKN43PCeXpkenRVmpaUDhd0nloN6U7Q",
  authDomain: "to-do-list-73b20.firebaseapp.com",
  projectId: "to-do-list-73b20",
  storageBucket: "to-do-list-73b20.appspot.com",
  messagingSenderId: "52789953517",
  appId: "1:52789953517:web:a8d7000133444932559de4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
