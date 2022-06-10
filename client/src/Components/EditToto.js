import React, {Fragment, useState} from 'react'

const EditToto = (props) => {
    const [description, setDescription] = useState(props.item.description);

    async function updateDescription(e){
        e.preventDefault();
        const body = {description};
        const editDescription = await fetch(`http://localhost:3001/todos/${props.item.todo_id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }) 

        window.location = '/';
    }

  return <Fragment>
  <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${props.item.todo_id}`}>
    Edit
  </button>
  

  <div class="modal" id={`id${props.item.todo_id}`}>
    <div class="modal-dialog">
      <div class="modal-content">
  
     
        <div class="modal-header">
          <h4 class="modal-title">Edit todo</h4>
       
        </div>
  
       
        <div class="modal-body">
            <input type='text' className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
  
   
        <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(props.item.description)}>Close</button>
        </div>
  
      </div>
    </div>
  </div></Fragment>
}

export default EditToto