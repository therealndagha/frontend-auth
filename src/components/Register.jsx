import { useState } from "react";

const Register = ()=>{
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        email: "",
        password: "",
        password1: ""
    });
    const [status, setStatus] = useState(null);
    const [registerErrors, setRegisterErrors] = useState({
        username: "",
        password: ""
    });
    const handleInputOnChange = (event) => {
         const {name, value} = event.target;
         setRegisterFormData({
            ...registerFormData, [name] : value
         })
    }
    const handleSubmit = (event) =>{
          event.preventDefault();
          const {username, email, password, password1} = registerFormData;
          if(password != password1) {
                setRegisterErrors({...registerErrors, password: "password do not match please check password."})
          }
                else{
                    
                const communicateWithBackend = async() =>{
                    try {
                        const apiResponse = await fetch("https://node-js-auth-7623.onrender.com/api/auth/register",{
                            method: "POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body: JSON.stringify({username, email, password})
                        })
                        const result = await apiResponse.json();
                        setStatus(result)
                    } catch (error) {
                        setStatus(error)
                    }
                 }
                 
                 communicateWithBackend()
                }

        }


    console.log(registerFormData);
    console.log(status)
    return <>
          <div className="container mt-3 p-3">
             <h1 className="text-center display-2">Register</h1>

              <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                      <input type="text"  onChange={handleInputOnChange} className="form-control" name="username" placeholder="enter a username"  value={registerFormData.username}/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="text" onChange={handleInputOnChange} className="form-control" name="email" placeholder="enter your email" value={registerFormData.email}/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="password" onChange={handleInputOnChange} className="form-control" name="password" placeholder="enter password" value={registerFormData.password} />
                  </div>
                  <div className="input-group mb-3">
                      <input type="password" onChange={handleInputOnChange} className="form-control" name="password1" placeholder="confirm password" value={registerFormData.password1} />
                  </div>
                  <div>
                       <span className="text-danger">{registerErrors.password}</span>
                  </div>
                  <div className="text-center mt-2">
                 <button type="submit" className="btn btn-lg btn-primary">REGISTER</button>
             </div>
              </form>
                <div>
                    {
                        status?.success ? <p className="text-info">{status?.message}</p> : <p className="text-danger">{status?.message}</p>
                    }
                </div>

          </div>
    </>
}

export default Register;