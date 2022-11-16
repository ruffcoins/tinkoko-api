import Todo, { Todos } from "../model/Todo";
import {ObjectId} from "mongodb";

export default class TodoService {

  private TodoCollection = Todos;

  async getAllTodos(pageSize: number, page: number) {
    try {
      const result = await this.TodoCollection.find().limit(pageSize).skip(pageSize * page);
      const todos = await result.toArray();
      return todos;
    } catch (e) {
      return e;
    }
  }

  async createTodo(todo: Todo) {
    try {
      const insertResult = await this.TodoCollection.insertOne(todo);
      if (!insertResult.acknowledged) throw new Error('Error Inserting Todo');

      return ({
        _id: insertResult.insertedId,
        ...todo
      })

      // return `Document created successfully`;

    } catch (e) {
      return e;
    }
  }

  async getTodo(id: string) {
    try {
      const result = await this.TodoCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!result) {
        throw new Error(`Todo with id "${id}" not found`);
      }

      return result;
    } catch (e) {
      return e;
    }
  }

  async updateTodo(id: string, todo: Partial<Todo>) {
    try {
      const foundTodo = await  this.TodoCollection.findOne({_id: new ObjectId(id)});
      const updateResult = await this.TodoCollection.findOneAndUpdate({
          _id: new ObjectId(id),
        },
        {
          $set: {
            status: todo.status ? todo.status : foundTodo.status,
            description: todo.description ? todo.description : foundTodo.description,
            title: todo.title ? todo.title : foundTodo.title,
            updatedAt: new Date().toISOString()
          },
        },
        {
          returnDocument: 'after',
        });

      if (!updateResult.value) {
        return `Todo with id "${id}" not found`;
      }

      return updateResult.value;
    } catch (e) {
      return e;
    }
  }

  async deleteTodo(id: string): Promise<any> {
    try {
      const deleteResult = await this.TodoCollection.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResult.value) {
       return `Todo with id "${id}" not found`;
      }

      return `Todo deleted successfully`;
    } catch (e) {
      return e;
    }
  }
};