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
   <div className="flex justify-center ">
    <div className="flex flex-col  border border-green-100 mt-10 p-4 sm:p-6 rounded-lg ">
  {/* User Info Section */}
  <div className="space-y-2">
    <p className="font-semibold">Name: <span className="">{name}</span></p>
    <p className=" font-semibold">Username: <span className="">{username}</span></p>
    <p className="font-semibold">Email: <span className="">{email}</span></p>
  </div>

  {/* Buttons Section */}
  <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
     {/* <button className="bg-green-500 hover:bg-green-600 p-2 rounded-lg  text-white font-semibold transition duration-200 ease-in-out cursor-pointer">
      Update
    </button> */}
    <button onClick={deleteAcc} className="bg-red-500 hover:bg-red-600 p-2 rounded-lg  text-white font-semibold transition duration-200 ease-in-out cursor-pointer">
      Delete
    </button> 
    <button
      className="bg-red-500 hover:bg-green-600 p-2 rounded-lg  text-white font-semibold transition duration-200 ease-in-out cursor-pointer"
      onClick={Logout}
    >
      Logout
    </button>
  </div>
</div>
   </div>
  )
}

export default UserInfo