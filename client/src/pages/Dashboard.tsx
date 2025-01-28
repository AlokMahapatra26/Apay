import { Users } from "../components/Users";
import Greet from "../components/Greet";
import { useNavigate } from "react-router";
import { Balance } from "../components/Balance";

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-center w-full min-h-screen ">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-18  max-w-screen-xl w-full">
        <Greet name="Alok"/>
        <Balance/>
        <Users />
        <button className="p-2 border rounded " onClick={()=>navigate("/deposite")}>Deposite Money</button>
      </div>
    </div>
  );
}

export default Dashboard;
