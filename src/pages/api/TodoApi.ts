import connectDB from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getTodos(req: NextApiRequest, res: NextApiResponse) {
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
}

export async function createTodo(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, deadline } = req.body;

    try {
      const connection = connectDB();

      const query = `
        INSERT INTO todo (title, content, deadline) 
        VALUES (?, ?, ?)`;
      const values = [title, content, deadline];

      await connection.query(query, values);
      connection.end();

      res.status(200).json({ message: 'Todo created successfully' });
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
}

export async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content, deadline } = req.body;

  try {
    const connection = connectDB();

    const query =  'UPDATE todo SET title = ?, content = ?, deadline = ? WHERE id = ?';
    const values = [title, content, deadline, id];

    await connection.query(query, values);
    connection.end();

    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
}

export async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    const connection = connectDB();

    const query =  'DELETE FROM todo WHERE id = ?';
    const values = [id];

    await connection.query(query, values);
    connection.end();

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}