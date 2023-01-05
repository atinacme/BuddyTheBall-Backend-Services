const db = require("../models");
const Coach = db.coach;

exports.getCoaches = (req, res) => {
    Coach.find()
        .populate("assigned_schools", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving coaches."
            });
        });
};

exports.findParticularCoach = (req, res) => {
    const id = req.params.id;

    Coach.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Coach with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Coach with id=" + id });
        });
};

exports.updateCoach = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Coach.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Coach with id=${id}. Maybe Coach was not found!`
                });
            } else res.send({ message: "Coach was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Coach with id=" + id
            });
        });
};

exports.deleteCoach = (req, res) => {
    const id = req.params.id;

    Coach.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Coach with id=${id}. Maybe Coach was not found!`
                });
            } else {
                res.send({
                    message: "Coach was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Coach with id=" + id
            });
        });
};