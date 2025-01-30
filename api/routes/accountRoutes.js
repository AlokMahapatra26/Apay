const express = require('express');
const Account = require('../models/Account');
const mongoose = require('mongoose');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();


router.post("/balance", verifyToken , async (req, res) => {
    try{
        const {userId} = req.body;
        const account = await Account.findOne({ userId: userId });
        if (!account) {
            return res.status(400).json({ msg: "Account not found" });
        }
        res.status(200).json({ balance: account.balance });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});


router.post("/deposit", verifyToken ,async (req, res) => {
    try{

        const {userId  ,amount } = req.body;
        

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ msg: "Invalid amount" });
        }

        //Add the amount to the balance
        const account = await Account.findOneAndUpdate(
            { userId : userId },
            { $inc: { balance: amount } }, // Atomically increment the balance
            { new: true, runValidators: true } // Return the updated account and run validators
          );

          if(!account){
            return res.status(400).json({ msg:"Account not found"})
        }  

        //Save the updated account
        await account.save();

        res.status(200).json({ msg: "Deposit sucessfull" });

    }catch(error){
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});


///// NOT SO GOOD APPROACH ////////
router.post("/transfer" , verifyToken, async (req, res) => {
    const {amount, to , userId } = req.body;

    const account = await Account.findOne({ userId });

    if(!account){
        return res.status(400).json({ msg: "Account not found" });
    }

    if (account.balance < amount) {
        return res.status(400).json({ msg: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to });

    if (!toAccount) {
        return res.status(400).json({ msg: "Recipient account not found" });
    }

    await Account.updateOne({
        userId
    } , {
        $inc : {balance : -amount}
    })

    await Account.updateOne({
        userId:to
    } , {
        $inc : {balance : amount}
    })

    res.status(200).json({ "message" : "Transfer successful" });
});


////// GOOD APPROACH ///////
  // Fetch the accounts within the transaction
//   router.post("/transfer" ,  async (req, res) => {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     const { amount, to , userId } = req.body;

//     // Fetch the accounts within the transaction
//     const account = await Account.findOne({ userId }).session(session);

//     if (!account || account.balance < amount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Insufficient balance"
//         });
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);

//     if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Invalid account"
//         });
//     }

//     // Perform the transfer
//     await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
//     await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//     // Commit the transaction
//     await session.commitTransaction();

//     res.json({
//         message: "Transfer successful"
//     });
// });




module.exports = router;