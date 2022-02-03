import React,{Component} from 'react';
import axios from "axios";
import apiUrl from "./config.json";
import auth from "./services/authServices"
class Logout extends Component{
    state={

    }
   async componentDidMount(){
        const tokenStr=localStorage.getItem("token")
        const user = auth.getCurrentUser();
    //  console.log(tokenStr)
         const sts = await axios.post(apiUrl.apiEnd+"/logout",{userid:user.id,sessionid:user.sessionid})
        //  console.log(sts)
        localStorage.removeItem("token")
        // this.props.history.push("/login")
         window.location='/'
    }
    render(){
        return(<></>);
    }
}
export default Logout;