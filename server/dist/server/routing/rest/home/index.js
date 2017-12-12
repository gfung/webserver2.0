"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
let router = express.Router();
router.route('/')
    .all((req, res, next) => {
    return next();
})
    .get((req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '../../../public/index2.html'));
});
// .post()
// .put()
// .delete()
// .head() // get head info
// .trace() //  echo's back input back to the user
router
    .route('*')
    .all(function (req, res, next) {
    res.send({ status: 404, message: "URL does not exist" });
});
module.exports = router;
//# sourceMappingURL=index.js.map