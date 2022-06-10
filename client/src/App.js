import React, {Fragment} from 'react';
import './App.css';
import InputTodo from './Components/InputTodo';
import ListTodo from './Components/ListTodo';

function App() {
  return (
   <Fragment>
     <InputTodo/>
     <ListTodo />
   </Fragment>
  );
}

export default App;
