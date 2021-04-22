import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

import Todos from './views/todos';

function App(){
    
    return (
      <Todos></Todos>
    );
  
}

render(<App />, document.getElementById('root'));
