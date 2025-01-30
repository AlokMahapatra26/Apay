const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {z} = require('zod')
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const verifyToken = require('../middlewares/verifyToken');


// Zod schema for user registration
const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8 , "Password must be at least 8 characters long")
});
   
// Register a new user
router.post("/register", async (req, res) => { 
    try {
        // Validate the user input using Zod
        const validatedUser = userSchema.parse(req.body);
        const { name, username, email, password } = validatedUser;

        // Check if user already exists in the database
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        // Account Default account balance
         const newAccount  = new Account({
            userId: newUser._id,
            balance: 0
        });



        // Save the new user to the database
        await newUser.save();
        await newAccount.save();
        

        // Send a response back
        res.status(201).json({
            msg: "User created successfully",
            id : newUser._id,
            user: { name, username, email },
            account : {id : newAccount._id , balance : newAccount.balance}  
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation errors from Zod
            return res.status(400).json({
                message: 'Validation failed.',
                errors: error.errors.map((err) => err.message),
            });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});



// Zod schema for login validation
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });
  
  // Login a user
  router.post("/login", async (req, res) => {
    try {
      // Validate input using Zod
      const { email, password } = loginSchema.parse(req.body);
  
      // Find user in the database
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ msg: "Invalid email or password" }); // Generic error message
      }
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid email or password" }); // Generic error message
      }

      
  
      // Generate JWT token
      const token = jwt.sign(
        { id: existingUser._id }, 
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // getting account details
      // Account Default account balance
      const newAccount  = await Account.findOne({userId : existingUser._id});
  
      // Send response
      res.status(200).json({
        msg: "Login successful",
        token,
        user: {
          id : existingUser._id,  
          username : existingUser.username,
          name: existingUser.name,
          email: existingUser.email,
        },
        account : {id : newAccount._id , balance : newAccount.balance} 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors from Zod
        return res.status(400).json({
          message: "Validation failed.",
          errors: error.errors.map((err) => err.message),
        });
      }
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again." });
    }
  });



  // Zod schema for updating user


const updatedBody = z.object({
    name:z.string().optional(),
    username:z.string().optional(),
    email:z.string().email("Invalid email format").optional(),
    password:z.string().min(8 , "Password must be at least 8 characters long").optional()
})


router.put("/update/:id", verifyToken , async (req, res) => {
  try{
    const validatedBody = updatedBody.parse(req.body);
    const { name, username, email, password } = validatedBody;
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({msg:"User not found"});
    }

    if(name){
      user.name = name;
    }
    if(username){
      user.username = username;
    }
    if(email){
      user.email = email;
    }
    if(password){
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.status(200).json({msg:"User updated successfully"});
    
  }catch(error){
    if (error instanceof z.ZodError) {
      // Handle validation errors from Zod
      return res.status(400).json({
        message: "Validation failed.",
        errors: error.errors.map((err) => err.message),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
}
)



router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user in one step
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});



router.get("/bulk" , verifyToken, async (req,res)=>{ 
  
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $or: [
        { username: { "$regex": filter, "$options": "i" } },
        { name: { "$regex": filter, "$options": "i" } },
        { email: { "$regex": filter, "$options": "i" } }
      ]
    });
    res.status(200).json({
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }

});


module.exports = router;