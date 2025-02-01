import { Users } from "../components/Users";
import Greet from "../components/Greet";
import { useNavigate } from "react-router";
import { Balance } from "../components/Balance";

const Dashboard = () => {

  const navigate = useNavigate();
  let greetname = localStorage.getItem("name") || "Guest";
  let id = localStorage.getItem("id") || "Guest";

  return (
    <div className="flex justify-center w-full bg-gradient-to-br from-green-50 to-green-100 min-h-[calc(100vh-88px)] p-4 sm:p-6 md:p-8">
  <div className="w-full max-w-screen-xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-18">
    {/* Greet Component */}
    <div className="mb-6 sm:mb-8">
      <Greet name={greetname} />
    </div>

    <hr />
    <br />
    <br />

    {/* Balance Component */}
    <div className="mb-6 sm:mb-8">
      <Balance /> 
    </div>

    {/* Users Component */}
    <div className="mb-6 sm:mb-8">
      <Users />
    </div>

    {/* Deposite Button */}
    <div className="flex justify-center sm:justify-start">
      <button
        className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out font-semibold text-sm sm:text-base cursor-pointer"
        onClick={() => navigate("/deposite")}
      >
        Deposit Money
      </button>
      {
        id == '679b92073b0325127f81feab' ? <button
        className="px-4 py-2 sm:px-6 sm:py-3 ml-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out font-semibold text-sm sm:text-base cursor-pointer"
        onClick={() => navigate("/admin-panel")}
      >
        Admin Panel
      </button> : ''
      }
      
    </div>
  </div>
</div>
  );
}

export default Dashboard;
