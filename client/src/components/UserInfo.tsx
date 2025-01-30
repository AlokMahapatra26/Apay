import { useNavigate } from "react-router";
import axios from "axios";
const UserInfo = () => {

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/login")
  }

  const deleteAcc = () => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const userId = localStorage.getItem('id'); // Or get user ID from somewhere else

    axios.delete(`http://localhost:3000/api/v1/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` } // Add Authorization header
    })
    .then(response => {
        console.log('Success:', response.data);
        alert(response.data.msg);
        localStorage.clear();
        navigate("/login")
    })
    .catch(error => {
        console.log('Error:', error);
        // Handle error
    });
};


  const name = localStorage.getItem("name")
  const username = localStorage.getItem("username")
  const email = localStorage.getItem("email")

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100 min-h-[calc(100vh-88px)] p-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl border border-green-100 p-6 sm:p-8">
        {/* User Info Section */}
        <div className="space-y-3 text-gray-800">
            <p className="text-lg font-semibold">Name: <span className="font-normal">{name}</span></p>
            <p className="text-lg font-semibold">Username: <span className="font-normal">{username}</span></p>
            <p className="text-lg font-semibold">Email: <span className="font-normal">{email}</span></p>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            {/* Delete Button */}
            <button 
                onClick={deleteAcc} 
                className="cursor-pointer w-full sm:w-auto px-4 py-2 text-lg font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
                Delete
            </button> 
            
            {/* Logout Button */}
            <button 
                onClick={Logout} 
                className=" cursor-pointer w-full sm:w-auto px-4 py-2 text-lg font-semibold bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    </div>
</div>

  )
}

export default UserInfo