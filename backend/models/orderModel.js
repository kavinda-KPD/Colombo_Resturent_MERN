const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderItems:[],
    isDelivered:{type:String,require,default:false},
},{
    timestamps:true
})

const orderModel = mongoose.model("orders",orderSchema);
module.exports = orderModel;