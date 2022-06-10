import React, {Fragment, useState, useEffect} from 'react'
import EditToto from './EditToto';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);


   const deleteTodo = async id => {
        try {
            
            const deleteResponse = await fetch(`http://localhost:3001/todos/${id}`, {
                method: 'DELETE'
            })
            
            setTodos(todos.filter(todo => todo.todo_id !== id))

        } catch (error) {
            console.log(error)
        }
    }

    async function getTodos(){
        try {

            const response = await fetch('http://localhost:3001/todos');
            const jsonData = await response.json();

            console.log(jsonData);
            setTodos(jsonData);

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, [])



  return (
    <Fragment>
         <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
     
          {todos.map(item => ( 
          <tr key={item.todo_id}>
            <td>{item.description}</td>
            <td> 
                <EditToto item={item} /> 
                </td>
            <td><button className='btn btn-danger' onClick={() => deleteTodo(item.todo_id)} >Delete</button></td></tr>
          ))}
      
    </tbody>
  </table>
    </Fragment>
  )
}

export default ListTodo