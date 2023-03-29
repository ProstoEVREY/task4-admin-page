import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./router";
import {BrowserRouter} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userApi";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)

  async function fn(){
    user.setUser(true)
    user.setIsAuth(true)
  }

  useEffect(()=> {
    setTimeout(()=>{

    },1000)

    check().then(() => fn()).finally(()=>
      setLoading(false))
  },[])
  if(loading){
    return <Spinner animation={"grow"} />
  }


  return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  );
})

export default App;
