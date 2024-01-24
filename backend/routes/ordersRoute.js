const express = require("express")
const router = express.Router();

router.post("/placeorder",async(req,res) =>{
    try {
        const orderItems = req.body;
        console.log(req.body);
    } catch (error) {
        
    }
})

module.exports = router;