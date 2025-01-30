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
    
    


    return <div className="flex justify-center h-screen ">
        <div className="h-full flex flex-col justify-center">
            <div
                className=" h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white  rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{username[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{username}</h3><br />
                    
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="opacity-50 mt-2">{email}</p>
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="name"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm "
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e : any)=>setAmount(e.target.value)}
                    />
                    </div>
                    <button onClick={initiatePayment} className="justify-center rounded-md text-lg font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white cursor-pointer hover:bg-green-600" >
                        Pay
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}