import React from 'react';
import { Todo } from '../models/todo';
import { dispatch, FormStateController, Get, RxForm, Field, required } from 'ajwah-reactive-form';
import { TodoController } from "../controllers/todoController";
import { take } from "rxjs/operators";

export interface Props {
    todo: Todo
}



const todoItem: React.FC<Props> = ({  todo }) => {
    
    function submit(form: any, observer?: FormStateController) {
        dispatch('updateTodo', { ...form });
        Get(TodoController).updated$.pipe(take(1)).subscribe(res => {
            observer?.notify('description', { flag: false })
        })
    }
    return <div className="flex bg-white border p-2 justify-between">
        <div>
            <input
                className="align-middle mr-1"
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={(e) => dispatch('updateTodo', { ...todo, completed: e.target.checked })}
            />
            <RxForm initialValues={todo} onSubmit={submit} render={({ observer, handleSubmit }) =>
                <form className="inline-block" onSubmit={handleSubmit}>
                    <Field
                        name="description"
                        observer={observer}
                        onChange={({ elm, value }) => console.log(value)}
                        autoFocus
                        debounce
                        validators={[required('Task should not be empty')]}
                        render={({ value, setValue, setRef, flag, setFlag }) =>

                            flag ?
                                <input
                                    className="ml-1 pl-2 border"
                                    onBlur={() => setFlag(false)}
                                    defaultValue={value}
                                    onChange={e => setValue(e.currentTarget.value)}
                                    type="text"
                                    ref={setRef}

                                />
                                :
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onDoubleClick={() => setFlag(true)}
                                >
                                    {todo.description}
                                </span>
                        } />
                </form>
            } />
        </div>
        <div>
            <button
                className="text-red-200 hover:text-red-600"
                onClick={() => dispatch('removeTodo', todo)}>
                Remove
      </button>
        </div>
    </div>
}
export default React.memo(todoItem);