const express = require("express");
const {EmiModel} = require("../model/EMIModel")
const bcrypt = require("bcrypt")
const EmiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { AuthMiddleWare } = require("../Middleware/AuthMiddleware");
EmiRouter.post("/check", AuthMiddleWare, async (req, res) => {
   const {loan,rate,tenure,authorId}= req.body;
   //calculations
    let monthrate = rate/12/100;
    monthrate = monthrate.toFixed(6)
    // console.log(monthrate)
    // EMI:E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 ) 
    let userEmi = (loan * monthrate * (1+monthrate)**tenure) / ((1+monthrate)**(tenure-1));
    // console.log(userEmi)
    let interestPayable= (userEmi*tenure)-loan;
    let totalPayment = loan+interestPayable;
    try {
        const emi = new EmiModel({
            loan,
            rate,
            tenure,
            emi:userEmi,
            interest:interestPayable,
            payment:totalPayment,
            authorId:authorId
        })
        await emi.save();
        res.status(200).send(emi)
        
    } catch (error) {
        console.log(error);
        res.status(400).send({err:error.message})
    }
    
    


})
  
module.exports = {
    EmiRouter
}