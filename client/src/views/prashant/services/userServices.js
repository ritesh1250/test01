import http from "./httpServices";
import apiUrl from "../config.json";

const apiEndPoint=apiUrl.apiEnd+"/signup";
const tokenStr=localStorage.getItem("token")
export function register(user){
    return http.post(apiEndPoint,{
                        firstName:user.firstName,
                        lastName:user.lastName,
                        username:user.username,
                        email:user.email,
                        password:user.password,
                        role_name:user.role_name},{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
}