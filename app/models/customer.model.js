const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        parent_name: String,
        player_name: String,
        player_age: String,
        wristband_level: String,
        handed: String,
        num_buddy_books_read: String,
        jersey_size: String,
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coach"
        },
        class_photos: String,
        current_award: String,
        message: String
    })
);

module.exports = Customer;