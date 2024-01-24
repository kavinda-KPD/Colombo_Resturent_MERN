const express = require("express");
const orderModel = require("../models/orderModel");
const router = express.Router();

router.post("/placeorder", async (req, res) => {
  try {
    const orderItems = req.body;
    console.log(req.body);

    const newOrder = new orderModel({
      orderItems: orderItems,
    });

    newOrder.save();
    res.send("Order Save");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    console.log("Get all orders");
    const orders = await orderModel.find({});
    res.send(orders);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/getfamousfood", async (req, res) => {
  try {
    const mostSoldMainDish = await orderModel.aggregate([
      { $unwind: "$orderItems" },
      { $match: { "orderItems.category": "Main" } },
      {
        $group: {
          _id: "$orderItems.name",
          quantity: { $sum: "$orderItems.quantity" },
        },
      },
      {
        $sort: {
          quantity: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: 1,
        },
      },
    ]);

    const mostSoldSideDish = await orderModel.aggregate([
      { $unwind: "$orderItems" },
      { $match: { "orderItems.category": "Side" } },
      {
        $group: {
          _id: "$orderItems.name",
          quantity: { $sum: "$orderItems.quantity" },
        },
      },
      {
        $sort: {
          quantity: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: 1,
        },
      },
    ]);

    const topMainDish = await orderModel.aggregate([
      { $unwind: "$orderItems" },
      { $match: { "orderItems.category": "Main" } },
      {
        $lookup: {
          from: "orderModels",
          let: { mainDish: "$orderItems.name" },
          pipeline: [
            { $unwind: "$orderItems" },
            {
              $match: {
                "orderItems.category": "Side",
                "orderItems.name": mostSoldSideDish[0].name,
              },
            },
            { $group: { _id: "$_id", count: { $sum: 1 } } },
            { $match: { count: { $gt: 0 } } },
          ],
          as: "mostSoldSideDishOrders",
        },
      },
      {
        $group: {
          _id: "$orderItems.name",
          quantity: { $sum: "$orderItems.quantity" },
          totalMostSoldSideDishOrders: {
            $sum: { $size: "$mostSoldSideDishOrders" },
          },
        },
      },
      {
        $sort: {
          totalMostSoldSideDishOrders: -1,
          quantity: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: 1,
          totalMostSoldSideDishOrders: 1,
        },
      },
    ]);

    const famousFoods = {
      mostSoldMainDish: mostSoldMainDish[0],
      mostSoldSideDish: mostSoldSideDish[0],
      topMainDish: topMainDish,
    };

    return res
      .status(200)
      .json({
        message: "Most sold Main dish retrieved successfully",
        data: famousFoods,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/getrevenuedetails", async (req, res) => {
  try {
    const todayOrders = await orderModel.find({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });

    const totalPrice = todayOrders.reduce((acc, order) => {
      return (
        acc +
        order.orderItems.reduce((orderAcc, item) => {
          return orderAcc + item.price;
        }, 0)
      );
    }, 0);

    const categoryTotals = {
      Main: 0,
      Side: 0,
      desert: 0,
    };

    todayOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.category in categoryTotals) {
          categoryTotals[item.category] += item.price;
        }
      });
    });

    const revenueDetails = {
      totalPrice: totalPrice,
      categoryTotals: categoryTotals,
    };

    return res
      .status(200)
      .json({
        message: "Total price of items sold today",
        data: revenueDetails,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/getweekrevenuedetails", async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const revenueDetails = {};
    const currentDate = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      revenueDetails[currentDate.toISOString().split('T')[0]] = { Main: 0, Side: 0, Dessert: 0 };
      currentDate.setDate(currentDate.getDate() - 1);
    }

    const orders = await orderModel.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    orders.forEach((order) => {
      if (revenueDetails[order.createdAt.toISOString().split('T')[0]]) {
        order.orderItems.forEach((item) => {
          if (revenueDetails[order.createdAt.toISOString().split('T')[0]][item.category]) {
            revenueDetails[order.createdAt.toISOString().split('T')[0]][item.category] += item.price;
          }
          revenueDetails[order.createdAt.toISOString().split('T')[0]].totalPrice += item.price;
        });
      }
    });

    return res
      .status(200)
      .json({
        message: "Total price of items sold for each of the past 7 days",
        data: revenueDetails,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
