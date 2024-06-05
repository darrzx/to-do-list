// import connectDB from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth, db } from '@/utils/db';
import { doc, getDoc } from 'firebase/firestore';

export default async function LoginApi(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const { email, password } = req.body;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
          const user = userCredential.user;
          const docRef = doc(db, 'users', user.uid);

          try {
              const docSnap = await getDoc(docRef);
          
              if (docSnap.exists()) {
                const data = docSnap.data();
                const currUsername = data.username; 
              
                res.status(200).json({ currUsername });
              } 
          } catch (error) {
            res.status(401).json({ error: 'Invalid credentials' });
            console.error('Error fetching document:', error);
          }
      })

    // const connection = connectDB();
    
    // connection.query(
    //   `SELECT * FROM users WHERE username = ? AND password = ?`,
    //   [username, password],
    //   (error, results) => {
    //     if (error) {
    //       console.error('Error:', error);
    //       res.status(500).json({ error: 'Database error' });
    //       return;
    //     }

    //     if (results.length > 0) {
    //       res.status(200).json({ message: 'Login successful' });
    //     } else {
    //       res.status(401).json({ error: 'Invalid credentials' });
    //     }
    //   }
    // );

    // connection.end();
  } else {
    res.status(405).end();
  }
}
