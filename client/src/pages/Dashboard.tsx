import { Users } from "../components/Users";
import Greet from "../components/Greet";
import { useNavigate } from "react-router";
import { Balance } from "../components/Balance";

const Dashboard = () => {

  const navigate = useNavigate();
  let greetname = localStorage.getItem("name") || "Guest";

  return (
    <div className="flex justify-center w-full h-[calc(100vh-88px)]">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-18  max-w-screen-xl w-full">
        <Greet name={greetname}/>
        <Balance/>
        <Users />
        <button className="p-2 border rounded border-green cursor-pointer bg-green-500 text-white hover:bg-green-600 transition ease-in" onClick={()=>navigate("/deposite")}>Deposite Money</button>
      </div>
    </div>
  );
}

export default Dashboard;
