import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Todo from './partials/Todo'
import AddTodoModal from './partials/AddTodoModal';
import { useNavigate } from 'react-router-dom';
import { getTodoListApi, getToken } from '../services/api';
import { ToastContainer} from 'react-toastify';



function Home() {

  const navigation = useNavigate()
  const [list, setlist] = useState([]);
  const [refreshList, setrefreshList] = useState();


  useEffect(() => {
    if(!getToken){
      navigation('/login');
    }
    fetchTodoList()
  }, [refreshList])

  async function fetchTodoList() {
      const result = await getTodoListApi();
      console.log("TodoList" , result)
      
      

      if(result.status === 200 ){
        setlist(result.data)

      }

  }
  
  return <div>
    
      <Header/>
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {
            list.map((todo) => <Todo todo={todo}  key={todo._id} setrefreshList={setrefreshList}/>)
          }
        

          </div>
         </div>

         
          <div className="" style={{position: 'fixed' , right:50 , bottom:50 , zIndex:1030}}>
          <button type='button'
          data-bs-toggle = "modal"
          data-bs-target="#exampleModal"
          className='btn btn-outline-light'>
            ADD
          </button>
          </div>

          <AddTodoModal setrefreshList={setrefreshList}/>

          
          </div>;

    
      
}

export default Home