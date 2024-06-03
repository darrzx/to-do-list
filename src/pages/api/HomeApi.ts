import connectDB from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { createTodo, getTodos } from './TodoApi';

export default async function HomeApi(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    return getTodos(req, res);
  } else if (req.method === 'POST') {
    return createTodo(req, res);
  }

}
