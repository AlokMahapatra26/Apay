import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useNavigate } from "react-router"
import axios from "axios"
import { useState } from "react"

const Login = () => {

  const navigate = useNavigate();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();

  const handleEmailChange = (e : any) =>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e : any) =>{
    setPassword(e.target.value)
  }

  const handleSubmit = ()=>{
    console.log("Email : " , email , "Password : " , password)
    
    
    axios.post("http://localhost:3000/api/v1/user/login", {
      email: email,
      password: password
  })
  .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email);
      navigate("/dashboard");
  })
  .catch((error) => {
      // Check if the error has a response from the server
   
          alert(`Error: ${error.message}`);
      
  });
    
    
  }


  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 min-h-[calc(100vh-88px)]">
      <div className="w-96  p-4 rounded-lg  flex flex-col space-y-4 shadow-black ">
      <Heading title="Login" />
      <SubHeading subtitle="Enter your info to login" />
      <InputBox onChange={handleEmailChange} type="email" placeholder=" Enter your Email"/>
      <InputBox onChange={handlePasswordChange} type="password" placeholder=" Enter Password"/>
      <Button title="Login" onClick={handleSubmit}/>

      <div className="ml-2"><span>Create new account </span>
      <span onClick={()=>navigate("/register")} className="underline text-green-500 cursor-pointer"> Register</span></div>
      
      </div>
      </div>
    
  )
}

export default Login