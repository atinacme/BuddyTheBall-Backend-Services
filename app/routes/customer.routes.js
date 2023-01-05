const controller = require("../controllers/customer.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/getCustomers", controller.getCustomers);

    app.get("/api/getCustomerWithSchoolId/:id", controller.findCustomerWithSchoolId);

    app.get("/api/getParticularCustomer/:id", controller.findParticularCustomer);

    app.put("/api/updateCustomer/:id", controller.updateCustomer);

    app.delete("/api/deleteCustomer/:id", controller.deleteCustomer);
};