import connectDB from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function HomeApi(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
      const connection = connectDB();

      connection.query(
        `SELECT * FROM todo`,
        (error, results) => {
          if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Database error' });
            return;
          }

          console.log(results);
  
          if (results.length > 0) {
            res.status(200).json({ results });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        }
      );

      connection.end();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Database error' });
    }
    
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
