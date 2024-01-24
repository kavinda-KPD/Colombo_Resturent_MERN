const express = require("express");
const orderModel = require("../models/orderModel");
const router = express.Router();

router.post("/placeorder",async(req,res) =>{
    try {
        const orderItems = req.body;
        console.log(req.body);

        const newOrder = new orderModel({
            orderItems:orderItems
        })

        newOrder.save();
        res.send('Order Save')
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error})
    }
})

router.get('/getallorders',async(req,res) =>{
    try {
        console.log("Get all orders");
        const orders = await orderModel.find({});;
        res.send(orders);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:error})
    }
})

module.exports = router;