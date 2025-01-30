import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

const MoneyDeposite = () => {

  const [amount , setAmount] = useState<number | undefined>(undefined);
  const navigate = useNavigate()

  const deposite = () => {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token'); // Get token from localStorage

    const payload = {
        amount,
        userId: id
    };

    axios.post("http://localhost:3000/api/v1/account/deposit", payload, {
        headers: { Authorization: `Bearer ${token}` } // Add Authorization header
    })
    .then(response => {
        console.log('Success', response.data);
        navigate("/dashboard");
        alert("Money deposited successfully")
    })
    .catch(error => {
        console.log('Error:', error);
        alert(error)
    });
};


  

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100 min-h-[calc(100vh-88px)] p-4 sm:p-6 md:p-8">
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 bg-green-500 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Deposit Money</h2>
        </div>

        {/* Form Section */}
        <div className="p-6 space-y-6">
            {/* Amount Input Field */}
            <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-green-800" htmlFor="amount">
                    Amount (in Rs)
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    className="w-full h-12 rounded-md border border-green-400 bg-white px-4 text-sm sm:text-base text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>

            {/* Deposit Button */}
            <button
                className="w-full h-12 rounded-lg bg-green-500 text-white font-medium text-lg hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                onClick={deposite}
            >
                Deposit
            </button>
        </div>
    </div>
</div>

  )
}

export default MoneyDeposite