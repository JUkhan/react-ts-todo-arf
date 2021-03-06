import React from "react";
import { useStream } from 'ajwah-reactive-form';
import { TodoController } from "../controllers/todoController";

export default () => {
  
  const [{data:rotate}] = useStream(TodoController, service=> service.rotate$, ()=>0);
  
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "50%", top: 0 }}>
        {rotate > 0 ? (
          <svg
            width="70"
            height="70"
            style={{ transform: `rotate(${rotate}deg)` }}
          >
            <circle cy="35" cx="35" r="35" fill="lightgrey" />
            <circle cy="15" cx="35" r="10" fill="black" />
          </svg>
        ) : null}
      </div>
    </div>
  );
};
