// import connectDB from '@/utils/db';
import { db } from '@/utils/db';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getTodos(req: NextApiRequest, res: NextApiResponse) {
    try {
      const collectionRef = collection(db, 'todo');
      const querySnapshot = await getDocs(collectionRef);

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          deadline : doc.data().deadline,
        }));
        res.status(200).json({ fetchedData });
    } catch (error) {
      console.error('Error:', error);
      res.status(401).json({ error: 'Database error' });
    }
}

export async function createTodo(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, deadline } = req.body;

    try {
      const collectionRef = collection(db, "todo");
      await setDoc(doc(collectionRef), { title: title, content: content, deadline: deadline });

      res.status(200).json({ message: 'Todo created successfully' });
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
}

export async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content, deadline } = req.body;

  try {
    const collectionRef = doc(db, 'todo', id);
    await updateDoc(collectionRef, { title: title, content: content, deadline: deadline });

    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
}

export async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    const collectionRef = doc(db, 'todo', id);
    await deleteDoc(collectionRef);

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}