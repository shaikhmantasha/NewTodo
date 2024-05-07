import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { creataTodoApi } from '../../services/api.js';


function AddTodoModal({setrefreshList}) {
    const [todoDesc, settodoDesc] = useState('');


    const handleTodoSubmit =async () => {
        console.log(todoDesc , "TodoDesc");
        if(todoDesc === ''){
            toast("Todo is required");
            return
        }

        const result = await creataTodoApi({desc:todoDesc});
        console.log(result)

        if(result.status === 200 && result.data.status === 200){
            toast("Todo Added");
            setrefreshList(new Date())

            settodoDesc('');
        }
        else{
            toast("ni chalra")
        }

    }

  return (


    <div className="modal mt-5" id='exampleModal'>
        <ToastContainer/>
            <div className="modal-dialog" role='document'>
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title">Add new Todo</div>
                  <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label="close"
                  >
                  <span arial-hidden="true"></span>
                  </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <textarea name="" className='form-control'
                      rows={3}
                      onChange={(e) => {settodoDesc(e.target.value)}}
                      placeholder='write todos...'
                      ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer">
                  <button className='btn btn-secondary' onClick={() => {settodoDesc('')}} data-bs-dismiss = "modal">close</button>
                    <button className='btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss = "modal">Save todo</button>

                  </div>
                
              </div>
            </div>
            
        </div>
  )
}

export default AddTodoModal