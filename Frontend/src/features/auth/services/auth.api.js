import axios from "axios"

export async function register ({username ,email , password}){

    try {
        const response = await  axios.post('http://localhost:3000/api/auth/register', {
        username , email , password
    },{
        withCredentials :  true //now our server has the premission to set or read the data from the cookies
    })

    return response.data

    } catch (err) {
        console.log(err);
        
    }

}

export async function login ({email, password}){
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email ,password //data we are sending here
        } ,{
            withCredentials : true
        })

        return response.data
    } catch (err) {
        console.log(err);
        
    }
}


export async function logout(){
    try {
        const response = axios.get('http://localhost:3000/api/auth/logout',{
            withCredentials : true
        })

        return (await response).data
    } catch (err) {
        console.log(err);
        
    }
}


export async function getMe() {
  try {
    const response = await axios.get("http://localhost:3000/api/auth/get-me", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
    