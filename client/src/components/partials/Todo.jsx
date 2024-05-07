import React from 'react'
import moment from 'moment/moment'
import { deleteTodoApi, markTodoApi } from '../../services/api'
import { toast } from 'react-toastify'

function Todo({todo  , setrefreshList}) {
  const handleDelete = async() => { 
    const result = await deleteTodoApi({
      todo_id:  todo._id
    })
    console.log("delete Todo" , result)

    if(result.status === 200){
      setrefreshList(Date())
      toast('deleted')
      
    }else{
      toast('Failed to delete!, Try Again')
    }
   }


   const handleMarkTodo = async() => { 
    const result = await markTodoApi({
      todo_id:  todo._id
    })
    console.log("Mark Todo" , result)

    if(result.status === 200){
      setrefreshList(Date())
      toast(result.data.message)
      
    }else{
      toast('Failed to Mark!, Try Again')
    }
   }

  return (

    <div className="col-sm-3 mx-3 my-2 alert bg-light">
        <div className="card-header">
            {todo.isCompleted ? 'completed' : 'not Completed'}
        </div>
        <div className="card-body">
            <h4 className='card-title'>{todo.desc}</h4>
            <p className="card-text">{moment(todo.date).fromNow()}</p>
            <div className="actionButtons" style={{display:'flex' , justifyContent:'space-between' , alignItems: 'center'}}>
              <div className="deleteButton" >
                <button style={{background:'red'}} onClick={handleDelete}>Delete</button>
              </div>
              <div className="markTodo">
                <button onClick={handleMarkTodo} style={{background: 'lightgreen'}}>{todo.isCompleted? 'mark incomplete' : 'mark complete'}</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Todo