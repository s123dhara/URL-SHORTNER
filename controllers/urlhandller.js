const express = require('express')
const URL = require('../models/url'); // Ensure this path is correct
const ShortUniqueId = require('short-unique-id')
const QRcode = require('qrcode')

async function generateAnewShortURL(req, res) {
    const body = req.body;
    if (!body.url) { 
        return res.status(400).send("URL REQUIRED");
    }
    const uid = new ShortUniqueId({ length: 10 });
    // console.log(uid.randomUUID())
    const shortId = uid.randomUUID()

    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            timestamps : Date.now()
        });
        res.status(201).json({ shortId: shortId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { generateAnewShortURL };
