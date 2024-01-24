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


router.get('/getfamousfood', async (req, res) => {
    try {
        const mostSoldMainDish = await orderModel.aggregate([
            { $unwind: '$orderItems' },
            { $match: { 'orderItems.category': 'Main' } },
            {
                $group: {
                    _id: '$orderItems.name',
                    quantity: { $sum: '$orderItems.quantity' },
                }
            },
            {
                $sort: {
                    quantity: -1
                }
            },
            {
                $limit: 1
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    quantity: 1
                }
            }
        ]);

        const mostSoldSideDish = await orderModel.aggregate([
            { $unwind: '$orderItems' },
            { $match: { 'orderItems.category': 'Side' } },
            {
                $group: {
                    _id: '$orderItems.name',
                    quantity: { $sum: '$orderItems.quantity' },
                }
            },
            {
                $sort: {
                    quantity: -1
                }
            },
            {
                $limit: 1
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    quantity: 1
                }
            }
        ]);

        const famousFoods = {
            mostSoldMainDish: mostSoldMainDish[0],
            mostSoldSideDish: mostSoldSideDish[0]
          }

        return res.status(200).json({ message: 'Most sold Main dish retrieved successfully', data: famousFoods });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error });
    }
});

module.exports = router;