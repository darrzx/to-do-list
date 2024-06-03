import connectDB from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function LoginApi(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const connection = connectDB();
    
    connection.query(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, password],
      (error, results) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Database error' });
          return;
        }

        if (results.length > 0) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    );

    connection.end();
  } else {
    res.status(405).end();
  }
}
