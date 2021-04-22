import React from "react";
import { dispatch, useStream } from "ajwah-reactive-form";
import { TodoController } from "../controllers/todoController";
import { SearchCategory, TodoActions } from "../models/todo";

function btnClasses(isActive: boolean) {
  return `mr-2 text-blue-500 hover:text-blue-800 ${isActive ? "active" : ""}`;
}
function changeSC(category: SearchCategory) {
  dispatch(TodoActions.CHANGE_SEARCH_CATEGORY, category);
}
export default () => {
  const [{data:sc}] = useStream(
    TodoController,
    service => service.searchCategory$,
    con => con.state.searchCategory
  );
  const [{data:activeItem}] = useStream(
    TodoController,
    con => con.activeItem$,
    () => ""
  );

  return (
    <div>
      <div className="float-left">{activeItem}</div>
      <div className="float-right">
        <button
          className={btnClasses(sc === 1)}
          onClick={() => changeSC(SearchCategory.all)}
        >
          All
        </button>
        <button
          className={btnClasses(sc === 2)}
          onClick={() => changeSC(SearchCategory.active)}
        >
          Active
        </button>

        <button
          className={btnClasses(sc === 3)}
          onClick={() => changeSC(SearchCategory.completed)}
        >
          Completed
        </button>
      </div>
      <div className="clear-both" />
    </div>
  );
};
