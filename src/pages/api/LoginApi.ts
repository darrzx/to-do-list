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
  } else {
    res.status(405).end();
  }
}
