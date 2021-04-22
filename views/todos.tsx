import React from "react";
import Loading from "./loading";
import AddTodo from "./addTodo";
import Toolbar from "./toolbar";
import TodoItem from "./todoItem";
import Errors from "./error";
import { StreamBuilder, Get } from "ajwah-reactive-form";
import { TodoController } from "../controllers/todoController";

export default () => {
  return (
    <div className="bg-white rounded shadow p-6 m-4">
      <Loading />
      <AddTodo />
      <Toolbar />
      <StreamBuilder
        initialData={[]}
        stream={Get(TodoController).todos$}
        render={({data}) =>
          data.map(todo => <TodoItem todo={todo} key={todo.id} />)
        }
      />
      <Errors />
    </div>
  );
};
