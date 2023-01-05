const upload = require("../middlewares/upload");
const dbConfig = require("../config/db.config");
const db = require("../models");
const CustomerPhotos = db.customerPhotos;

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const ObjectID = require('mongodb').ObjectId;

const baseUrl = "http://localhost:8080/api/files/";

const mongoClient = new MongoClient(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);

const uploadCustomerPhotos = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.body, req.files);
        req.files.forEach(element => {
            const customerPhotos = new CustomerPhotos({
                customer_id: req.body.customer_id,
                school_id: req.body.school_id,
                coach_id: req.body.coach_id,
                photo_id: element.id
            });
            customerPhotos.save(customerPhotos);
        });

        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }


        return res.status(200).send({
            message: "Files have been uploaded.",
        });
    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }
        return res.status(500).send({
            message: `Error when trying upload many files: ${error}`,
        });
    }
};

const getSchoolFiles = async (req, res) => {
    try {
        await mongoClient.connect;
        const database = mongoClient.db(dbConfig.DB);
        const images = database.collection(dbConfig.imgBucket + ".files");
        const imagesCustomer = database.collection("customerphotos");
        const data = imagesCustomer.find({ school_id: req.params.id });
        // const imagesCustomer = database.collection("customerphotos");
        // const data = imagesCustomer.find({});
        let photoId = [];
        await data.forEach((doc) => {
            // console.log("doc--->", doc);
            photoId.push(doc.photo_id);
        });

        console.log("phto--->", photoId);

        var fileInfos = [];
        // const cursor = images.find({});
        // var cursor = await photoId.forEach((id))
        photoId.forEach(async (item) => {
            await images.findOne({ _id: ObjectID(item) })
                .then(res => {
                    fileInfos.push(res);
                    console.log(res, fileInfos);
                });
            // const cur = cursor.then((res) => console.log(res));
            // console.log("cur--->", fileInfos, fileInfos.length);
        });
        if ((await cursor.length) === 0) {
            return res.status(500).send({
                message: "No files found!",
            });
        }
        // await cursor.forEach((doc) => {
        // fileInfos.push({
        //     name: cursor.filename,
        //     url: baseUrl + cursor.filename,
        // });
        // });

        return res.status(200).send(fileInfos);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
};

module.exports = {
    uploadCustomerPhotos,
    getSchoolFiles
};