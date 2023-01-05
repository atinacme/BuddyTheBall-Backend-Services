const mongoose = require("mongoose");

const CustomerPhotos = mongoose.model(
    "CustomerPhotos",
    new mongoose.Schema({
        customer_id: String,
        school_id: String,
        coach_id: String,
        photo_id: String
    })
);

module.exports = CustomerPhotos;