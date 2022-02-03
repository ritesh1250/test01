import React, {
    Component
  } from 'react';
  import ParticlesBg from 'particles-bg';
  import Login from './Login';
  import './style23.css';
  
  class Prashant extends Component {
    constructor() {
      super();
      this.state = {
        name: 'React',
      };
    }
  
    render() {
      return ( <div>
        <Login/>
        <ParticlesBg  type = "circle" bg={true}/> 
        </div>
      );
    }
  }
  
  export default Prashant;