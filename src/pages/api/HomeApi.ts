import { NextApiRequest, NextApiResponse } from 'next';
import { createTodo, deleteTodo, getTodos, updateTodo } from './TodoApi';

export default async function HomeApi(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    return getTodos(req, res);
  } else if (req.method === 'POST') {
    return createTodo(req, res);
  } else if (req.method === 'PATCH') {
    return updateTodo(req, res);
  } else if (req.method === 'DELETE') {
    return deleteTodo(req, res);
  }

}
