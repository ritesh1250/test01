import axios from "axios"
import auth from "./authServices"
import apiUrl from "../config.json";

 axios.interceptors.response.use(null, error => {
    const expectedError = 
            error.response && 
            error.response.status >= 400 && 
            error.response.status <500;
// console.log(expectedError)


       if(!expectedError){
           console.log("logging the error",error);
           alert("An unexpected error occured");
       }else{ 
        const statusCode=error.response.status
           if(statusCode===450){
        const user = auth.getCurrentUser();
        alert("Your session has expire.So please login again")
         axios.post(apiUrl.apiEnd + "/logout", { userid: user.id, sessionid: user.sessionid })
        localStorage.removeItem("token")
        // this.props.history.push("/login")
        window.location = '/'
       }else if(statusCode==460){
        alert(error.response.data.err)
        localStorage.removeItem("token")
        window.location = '/'
       } 
       else if(statusCode==480){
         alert(error.response.data.err)
         localStorage.removeItem("token")
         window.location = '/'
        } 
    } 

       return Promise.reject(error);
});

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete
}