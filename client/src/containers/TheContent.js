import React, { Suspense } from 'react'
import auth from "../views/prashant/services/authServices"
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const user=auth.getCurrentUser();
  
  // const [user , setUser]=useState();

  // useEffect(()=>{
  //   const user=auth.getCurrentUser();
  //   setUser(user);
  // })
  return (
    <main className="c-main" style={{"padding-top":"5px"}}>
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            
            {user==null ? null : user.role_name==="Agent" || user.role_name==="Medly" ? (
               <Redirect from="/" to="/summary" />
            ):(
              <Redirect from="/" to="/dashboard" />
            )}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
