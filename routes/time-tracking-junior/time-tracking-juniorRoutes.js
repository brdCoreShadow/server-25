const express = require('express');
const router = express.Router()
const timeTrackingModel = require('../../controllers/time-tracking-junior/time-tracking-junior');


router.get("/", async (req, res) => {

try {
    
const data = await timeTrackingModel.getAll()

res.json(data)

} catch (error) {
    console.error("Error fetching tracker", error)

    res.status(500).json({message:`Server error: ${error}`})
}

})

module.exports = router