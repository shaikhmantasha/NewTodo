import axios from 'axios';
import { CREATE_TODO, DELETE_TODO, LOGIN, MARK_TODO, REGISTER, TODO_LIST } from './apiConstant.js';

export const login = async (data) => {
    return axios.post(LOGIN , data )
}

export const register = async (data) => {
    return axios.post(REGISTER , data )
}


export const creataTodoApi = async (data) => {
    let token =getToken();
    console.log(token , 'token')

    return axios.post(CREATE_TODO , data, {
        headers:{
            auth:token
        }
    })
}

// export const getTodoListApi = async (data) => {
//     let token =getToken();
//     console.log(token , 'token')
//     // console.log(data)

//     return axios.get(TODO_LIST ,data,{
//         headers:{
//             auth: token
//         }
//     })
// }
// import axios from 'axios';
// import { getToken } from './path/to/tokenService'; // Make sure to import the getToken function

export const getTodoListApi = async () => {
    let token = getToken();
    console.log(token, 'token'); // This logs the token, which is fine for debugging but consider removing for production

    try {
        const response = await axios.get(TODO_LIST, {
            headers: {
                auth: `${token}` // Assuming the API expects a Bearer token
            }
        });
        console.log(response)
        return response.data; // Returns the data part of the response
    } catch (error) {
        console.error('Failed to fetch todo list:', error);
        throw error; // Re-throw the error for caller handling or further processing
    }
};


export const deleteTodoApi = async (data) => {
    let token = getToken();
    console.log(token , 'token')

    return axios.post(DELETE_TODO , data , {
        headers:{
            auth:token
        }
    })
}

export const markTodoApi = async (data) => {
    let token = getToken();

    return axios.post(MARK_TODO , data , {
        headers:{
            auth:token
        }
    })
}


export function getToken() {
    let user = localStorage.getItem('user');

    if(!user) throw "user not present"
    const userObj = JSON.parse(user);
    return userObj.token;
}