import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register"

const App = () =>{
  const [renderLoginComponent, setRenderLoginComponent] = useState(true);
  
  return <section>
             <div className="container">
                <div className="p-5 mt-3">
                     {
                       renderLoginComponent ? <Login/> : <Register/>
                     }
                </div>
                <div className="text-center">
                    <button className="btn btn-light btn-lg" onClick={()=>setRenderLoginComponent(!renderLoginComponent)}>
                      {
                        renderLoginComponent ? <span>Switch To Register</span> : <span>Switch To Login</span>
                      }
                    </button>
                </div>
             </div>
  </section>
};


export default App;