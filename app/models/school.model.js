const mongoose = require("mongoose");

const School = mongoose.model(
    "School",
    new mongoose.Schema({
        school_name: String,
        territory: String,
        assigned_day: String
    })
);

module.exports = School;