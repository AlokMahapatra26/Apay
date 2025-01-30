import { useNavigate } from "react-router"

const Landing = () => {

    const navigate  = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-88px)] 
">
        <h1 className="text-4xl font-semibold">SAFE AND SECURE PAYMENT SOLUTION</h1><br />
        <button onClick={()=>navigate("/register")} className="p-2 bg-green-500 text-white rounded cursor-pointer">Join now</button>
    </div>
  )
}

export default Landing