import {db} from "./index";

export default interface Todo {
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string
}

export const Todos = db.collection<Todo>('todos');

