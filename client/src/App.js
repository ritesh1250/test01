import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import auth from "./views/prashant/services/authServices"
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));


const Prashant = React.lazy(() => import('./views/prashant/Parshant'));

class App extends Component {
  state={
    user:{}
  }
componentDidMount(){
  const user1=auth.getCurrentUser();
  this.setState({user:user1})
}
  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {this.state.user ? (
                 <Route  path="/"  render={props => <TheLayout {...props}/>} />
           
            ):(
              <Route path="/" render={props => <Prashant {...props}/>} />
              )}
              {/* <Redirect from="/" exact to={this.state.user==null ? "/login" : "/"}/> */}
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
