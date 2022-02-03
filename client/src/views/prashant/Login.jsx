import React, { useState } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from "./config.json";
import axios from "axios"
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import logo from "../../assets/icons/logo.png";
import auth from "./services/authServices"
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal } from "react-bootstrap";
import {bgWarning,buttonColor} from"./Element.css"


const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  }


  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();

    setErrors(errors)
    try {
      auth.login(username, password).then(res => {

        const status = localStorage.getItem("status")

        if (status == 410) {
          setShow(true)
          localStorage.removeItem("status")
        } else {
          setShow(false)
         
        }


        //   history.push({
        //     pathname:"/",
        //     state: {
        //       response: res 
        //     }
        //  })
        // history.push("/");
        // window.history.push({
        //   pathname:  "/",
        //   state: {
        //     response: res 
        //   } 
        // })
      })
    } catch (ex) {
      // const errors={username:"Invald Username or Password",password:"Invalid username or password"};
      // console.log(ex)
      // toast.error(ex.status, {
      //   position: "top-right",
      //   autoClose: 7000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   });
      // alert(ex.status);

    }
  };
  const handleUseHere = async () => {
    const userData = localStorage.getItem("userid")
    const userData1 = localStorage.getItem("sessionid")
    const sts = await axios.post(apiUrl.apiEnd + "/logout", { userid: userData, sessionid: userData1 })
    auth.login(username, password)
    localStorage.removeItem("status")
    localStorage.removeItem("userid")
    localStorage.removeItem("sessionid")
    // this.props.history.push("/login")
    
  }
  const validate = () => {
    let errs = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password.trim()) errs.password = "Password is required";
    return errs;
  };
  const validateInput = e => {
    switch (e.currentTarget.name) {
      case "username":
        if (!e.currentTarget.value.trim()) return "Username is must be  required";
        break;
      case "password":
        if (!e.currentTarget.value.trim())
          return "password must be required";
        break;
      default:
        break;
    }
    return "";
  }

  const handleChange = e => {
    let errString = validateInput(e);
    const errors = { ...errors };
    errors[e.currentTarget.name] = errString;
    const { currentTarget: input } = e
    setErrors(errors)
    if (input.name === "username") {
      setUsername(input.value)
    } else {
      setPassword(input.value)
    }

  };

  return (

    <Container className="main" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{ marginTop: '10px' }} src={logo} alt="logo" />
        <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
          Welcome To Meest!
        </Typography>
        <Typography component="h1" variant="h5" style={{ marginTop: "10px" }}>
          Login
        </Typography>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <form className={classes.form} noValidate style={{ marginTop: "35px" }}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username "
            name="username"
            autoComplete="username"
            autoFocus
            // className="form-control"
            value={username}
            onChange={handleChange}
          />
          {errors.username ? (
            <span className="alert text-danger">{errors.username}</span>
          ) : (
            ""
          )}
          <TextField
            //  className="form-control"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          {errors.password ? (
            <span className="alert text-danger">{errors.password}</span>
          ) : (
            ""
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>

        </form>
        <Typography style={{}}>
          2021 @Copyright Meest
        </Typography>
      </div>
      {/* <div style={{borderRadius:10,backgroundColor:"green",height:100,width:100}}> */}
      <Modal show={show}  contentClassName="border    p-3 rounded" centered  >

        <Modal.Body  style={{color:"",fontSize:"17px"}}>
          User is already logged in on different tab
        </Modal.Body>
        <div className=" text-right col-12" >

          <Button style={{backgroundColor:"green",color:"white"}} className="pl-4 pr-4 rounded-pill" onClick={handleClose}>
            Close
      </Button>
          <Button style={{backgroundColor:"green",color:"white"}} className="ml-2 pl-4 pr-4 rounded-pill" onClick={handleUseHere}>
            Use Here
      </Button>
        </div>
      </Modal>
      {/* </div> */}
    </Container>
  );
}
