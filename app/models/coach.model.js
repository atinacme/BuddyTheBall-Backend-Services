const mongoose = require("mongoose");

const Coach = mongoose.model(
    "Coach",
    new mongoose.Schema({
        coach_name: String,
        tennis_club: String,
        assigned_territory: String,
        assigned_schools: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "School"
            }
        ],
        favorite_pro_player: String,
        handed: String,
        favorite_drill: String,
        class_photos: String,
        calendar_slot: String,
        message: String
    })
);

module.exports = Coach;