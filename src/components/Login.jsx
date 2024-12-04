
import { useState } from "react";
const Login = ()=>{
    const [data, setData] = useState({
        username: "",
        password:""
    })
    const [status, setStatus] = useState(null)
    
    const handleInputOnChange =  (event) =>{
        const {name, value} = event.target;
        setData({...data, [name]:value});
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const {username, password} = data;
        const communicateWithBackend = async()=>{
            try {
              const apiResponse = await fetch("https://node-js-auth-7623.onrender.com/api/auth/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({username, password})
              });
              const result = await apiResponse.json();
              setStatus(result)
                
            } catch (error) {
                setStatus(error)
            }
        }
        communicateWithBackend()

    }





       console.log(status)
    return <>
          <div className="container mt-3 p-3">
             <h1 className="text-center display-2">Login</h1>
             
             <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                      <input type="text" className="form-control" onChange={handleInputOnChange} value={data.username} name="username" placeholder="enter a username"  />
                  </div>
                  <div className="input-group mb-3">
                      <input type="password" className="form-control" onChange={handleInputOnChange} value={data.password} name="password" placeholder="enter password" />
                  </div>
                 
                  <div className="text-center mt-2">
                 <button type="submit" className="btn btn-lg btn-primary">LOGIN</button>
             </div>
              </form>
              <div>
                 <p>{status?.message}</p>
              </div>
          </div>
    </>
}

export default Login;