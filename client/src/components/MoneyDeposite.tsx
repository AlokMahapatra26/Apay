import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

const MoneyDeposite = () => {

  const [amount , setAmount] = useState();
  const navigate = useNavigate()

  const deposite = () => {
    const id = localStorage.getItem('id')

  const payload = {
    amount,
    userId : id
  }

  axios.post("http://localhost:3000/api/v1/account/deposit" , payload).then(response => {
    console.log('Success' , response.data)
    navigate("/dashboard")
  })
  .catch(error => {
    console.log('Error : ' , error)
  });
  
  }

  

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col space-y-4 p-4 w-96 bg-white rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Deposite Money</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
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
                  onChange={(e : any) => setAmount(e.target.value)}
                />
              </div>
              <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white " onClick={deposite}>
                Deposite
              </button>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default MoneyDeposite