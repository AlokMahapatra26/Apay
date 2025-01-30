import axios from "axios";
import { useState } from "react"
import { useLocation } from "react-router"
import { useNavigate } from "react-router";

export const SendMoney = () => {

    const [amount , setAmount] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const {to , username , email} = location.state;

    const id = localStorage.getItem('id')

    const payload = {
        amount,
        to,
        userId:id

    }

    const initiatePayment = () => {
        const token = localStorage.getItem('token'); // Get token from localStorage
    
        axios.post("http://localhost:3000/api/v1/account/transfer", payload, {
            headers: { Authorization: `Bearer ${token}` } // Add Authorization header
        })
        .then(response => {
            console.log('Success', response.data);
            alert(response.data.message);
            navigate("/dashboard");
        })
        .catch(error => {
            console.log('Error:', error);
            alert(error.response.data.msg)
        });
    
        console.log(amount);
    };
    
    


    return <div className="flex justify-center items-center min-h-[calc(100vh-88px)] bg-gradient-to-br from-green-50 to-green-100 p-4">
    <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>

        {/* User Info */}
        <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-semibold">
                {username[0]}
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800">{username}</h3>
                <p className="text-sm text-gray-500">{email}</p>
            </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="amount">
                Amount (in Rs)
            </label>
            <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="w-full h-12 rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={(e: any) => setAmount(e.target.value)}
            />
        </div>

        {/* Pay Button */}
        <button 
            onClick={initiatePayment} 
            className="w-full h-12 rounded-lg bg-green-500 text-white font-medium text-lg hover:bg-green-600 transition-all"
        >
            Pay
        </button>
    </div>
</div>

}