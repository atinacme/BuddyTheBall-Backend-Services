const controller = require("../controllers/coach.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/getCoaches", controller.getCoaches);

    app.get("/api/getParticularCoach/:id", controller.findParticularCoach);

    app.put("/api/updateCoach/:id", controller.updateCoach);

    app.delete("/api/deleteCoach/:id", controller.deleteCoach);
};