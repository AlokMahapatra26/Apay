import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

export const Users = () => {
  const navigate = useNavigate();
  
  interface User {
    id: string;
    name: string;
    // Add other user properties here
  }

  const [users, setUsers] = useState<User[]>([]); // State for user data
  const [search, setSearch] = useState(""); // State for search input
  const [error, setError] = useState(""); // State for handling errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value; // Capture the input value
    setSearch(filter);

    if (!filter) {
      setUsers([]); // Clear users if search is empty
      return;
    }

    setLoading(true);
    setError("");

    //TODO - Implement debouncing
    try {
      // Send GET request with filter as a query parameter
      const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
        params: { filter },
      });

      // Update users with the response data
      setUsers(response.data.users);
      console.log(response.data.users)
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <h1 className="font-bold text-xl mb-4">User Search</h1>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, username, or email..."
          className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <User key={user.id} user={user} navigate={navigate} />
          ))
        ) : (
          !loading && <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

function User({ user, navigate}:any) {
    return <div className="flex justify-between  p-2 my-2 ">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button title="Send Money" onClick={()=> navigate("/send" , {state : {to: user.id , username:user.username , email : user.email}})}/>
                           
        </div>
    </div>
}