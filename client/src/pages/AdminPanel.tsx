import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  balance: number;
  isFrozen?: boolean;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalMoney , setTotalMoney] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/admin/users-info");
        const { data: total_money } = await axios.get("http://localhost:3000/api/v1/admin/get-all-balance")
        setUsers(data);
        setTotalMoney(total_money)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFreezeToggle = async (id: string) => {
    try {
      const updatedUsers = users.map(user =>
        user._id === id ? { ...user, isFrozen: !user.isFrozen } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error freezing user:", error);
    }
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Total money in circulation</h2>
        <p className="border inline p-2  rounded">₹ {new Intl.NumberFormat('en-IN').format(totalMoney)}</p>
      <h2 className="text-xl font-bold mb-4 mt-4">Admin Panel - Users Info</h2>
      
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="border p-2 ">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Balance</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((user) => (
            <tr key={user._id} className="text-center rounded">
              <td className="border p-2">{user._id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">₹ {user.balance}</td>
              <td className="border p-2 space-x-2">
                <button 
                  className={`px-2 py-1 text-white rounded cursor-pointer ${user.isFrozen ? "bg-gray-500" : "bg-blue-500"}`} 
                  onClick={() => handleFreezeToggle(user._id)}
                >
                  {user.isFrozen ? "Unfreeze" : "Freeze"}
                </button>
                <button 
                  className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button 
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-gray-100 rounded">Page {currentPage} of {totalPages}</span>
        <button 
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      
    </div>
  );
};

export default AdminPanel;
