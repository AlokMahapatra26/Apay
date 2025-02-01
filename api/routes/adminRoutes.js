const express = require("express");
const User = require("../models/User");
const Account = require("../models/Account")
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");

router.get("/users-info" , isAdmin , async (req , res) => {

    const users = await User.find({});
    const accounts = await Account.find({});
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

// Convert accounts array into a Map for quick lookup
const accountMap = new Map(accounts.map(acc => [acc.userId.toString(), acc.balance]));

// Merge balance into user data
const mergedUsers = users.map(user => ({
    ...user.toObject(),  // Convert Mongoose document to plain object
    balance: accountMap.get(user._id.toString()) || 0 // Default balance to 0 if not found
}));

res.status(200).json(mergedUsers);
})


router.delete("/delete/:id", isAdmin ,async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete user
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  });


router.get("/get-all-balance" , isAdmin, async (req,res)=>{
  const accounts = await Account.find({});
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    res.status(200).json(totalBalance)

})  
  

module.exports = router;