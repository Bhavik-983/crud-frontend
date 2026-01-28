const base_url = import.meta.env.VITE_API_URL;
import axios from "axios";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
};

export const login = async(email: string, password: string) => {
    try{
        const response = await axios.post(`${base_url}/api/auth/login`, {
            email: email,
            password: password,
        })
        return response.data;
    }catch(e){
        console.log(e);
    }
}

export const createTask = async(title: string, description: string, status: string, assigned_to?: string) => {
   try{
    const payload: any = {
        title: title,
        description: description,
        status: status,
        fk_user_id: assigned_to,
    };
    const response = await axios.post(`${base_url}/api/task/create`, payload, getAuthHeaders());
    console.log('Create task response:', response.data);
    return response.data;
   }
   catch(error){
    console.error('Create task error:', error);
    throw error;
   }
}



export const getTask = async() => {
   try{
    const response = await axios.get(`${base_url}/api/task/list`, getAuthHeaders());
    return response.data;
   }
   catch(error){
    console.log(error);
    
   }
}


export const getUsers = async() => {
    try{
        const response = await axios.get(`${base_url}/api/admin/users`, getAuthHeaders());
        console.log(response,"response")
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const updateTaskByUser = async(task_id: string, title: string, description: string, status: string) => {
    try{
        const response =  axios.patch(`${base_url}/api/task/${task_id}`, {
            title: title,
            description: description,
            status: status,
        }, getAuthHeaders())
        return response;    

    }catch(e){
        console.log(e);
    }
}