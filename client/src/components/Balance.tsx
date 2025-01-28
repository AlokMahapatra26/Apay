import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = () => {


    const [balance , setBalance] = useState(0);

    useEffect(()=> {
        const id = localStorage.getItem('id')
    const payload = {
        userId : id,
    }

    axios.post("http://localhost:3000/api/v1/account/balance" , payload).then(response => {
        console.log('Success' , response.data)
        setBalance(response.data.balance)
      })
      .catch(error => {
        console.log('Error : ' , error)
      });
    },[])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance.toLocaleString('en-IN')}
        </div>
    </div>
}