import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import todosService from "../../service";

export const getAllTodos = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const pageSize = event.queryStringParameters.pageSize;
  const page = event.queryStringParameters.page;

  const todos = await todosService.getAllTodos(parseInt(pageSize), parseInt(page));
  return formatJSONResponse ({
	todos
  })
})

export const createTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
	const todo = await todosService.createTodo({
	  title: event.body.title,
	  description: event.body.description,
	  createdAt: new Date().toISOString(),
	  updatedAt: new Date().toISOString(),
	  status: false
	})

	return formatJSONResponse(todo)

  } catch (e) {
	return formatJSONResponse({
	  status: 500,
	  message: e
	});
  }
})

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
	const todo = await todosService.getTodo(id)
	return formatJSONResponse(
	  todo
	);
  } catch (e) {
	return formatJSONResponse({
	  status: 500,
	  message: e
	});
  }
})

export const updateTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
	const todo = await todosService.updateTodo(id, {
	  title: event?.body?.title,
	  description: event?.body?.description,
	  updatedAt: new Date().toISOString(),
	  status: event?.body?.status
	})
	return formatJSONResponse({
	  todo
	});
  } catch (e) {
	return formatJSONResponse({
	  status: 500,
	  message: e
	});
  }
})

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
	const todo = await todosService.deleteTodo(id)
	return formatJSONResponse({
	  todo
	});
  } catch (e) {
	return formatJSONResponse({
	  status: 500,
	  message: e
	});
  }
})