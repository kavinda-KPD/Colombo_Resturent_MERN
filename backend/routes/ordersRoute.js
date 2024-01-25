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
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weekRevenue = await orderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo,
            $lt: today,
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            category: "$orderItems.category",
          },
          totalPrice: { $sum: "$orderItems.price" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          categories: {
            $push: {
              category: "$_id.category",
              totalPrice: "$totalPrice",
            },
          },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    return res
        .status(200)
        .json({
          message: "Weekly Revenue Details",
          data: weekRevenue,
        });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
