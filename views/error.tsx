import React from 'react';
import { useStream } from 'ajwah-reactive-form';
import { TodoController } from "../controllers/todoController";


export default () => {
   
    const [{data:err}] = useStream(TodoController, service=> service.error$, ()=>'');
    return <div className="errors">{err}</div>
}