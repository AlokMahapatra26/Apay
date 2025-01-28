import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"

const Register = () => {

 const navigate = useNavigate();
 const [name , setName] = useState({});
 const [username , setUsername] = useState({});
 const [email , setEmail] = useState({});
 const [password , setPassword] = useState({});

  const handleNameChange = (e : any) =>{
    setName(e.target.value)
  }
  const handleUsernameChange = (e : any) =>{
    setUsername(e.target.value)
  }
  const handleEmailChange = (e : any) =>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e : any) =>{
    setPassword(e.target.value)
  }

  const handleSubmit =  ()=>{
    console.log("Name : " , name , "Username : " , username , "Email : " , email , "Password : " , password)

    axios.post("http://localhost:3000/api/v1/user/register" , {
      name : name,
      username : username,
      email : email,
      password : password
    }).then(
      (response)=>{
        console.log(response)
        navigate("/login")
    }
    )

  }


  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <div className="w-96  p-4 rounded-lg flex flex-col space-y-4 ">
      <Heading title="Register" />
      <SubHeading subtitle="Enter your info to register" />
<InputBox onChange={handleNameChange} type="text" placeholder="Enter your name" />
      <InputBox onChange={handleUsernameChange} type="text" placeholder=" Create username"/>
      <InputBox onChange={handleEmailChange} type="email" placeholder=" Enter your Email"/>
      <InputBox onChange={handlePasswordChange} type="password" placeholder=" Enter Password"/>

      <Button title="Register" onClick={handleSubmit}/>

      <div className="ml-2"><span>Already have an account ? </span>
      <span onClick={()=>navigate("/login")} className="underline text-green-500 cursor-pointer"> Login</span></div>
      
      
      </div>
    </div>
  )
}

export default Register