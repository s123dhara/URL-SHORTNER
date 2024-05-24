const express = require('express')
const { generateAnewShortURL } = require('../controllers/urlhandller') 


const router = express.Router()


router.get("/" ,(req, res)=>{
    // res.send("shorted url")
    res.render('home')
    

})

router.post("/create", generateAnewShortURL, async (req, res)=>{
    try {
        const { shortId } = res.locals; // Assuming generateAnewShortURL middleware sets this value
        // You may use this shortId to construct the short URL or handle it in your database
        // Respond with the short URL or any other relevant data
        res.status(201).json({ shortId: shortId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router