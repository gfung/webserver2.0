"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// import * as path from 'path';
let router = express.Router();
router.route('/')
    .all((req, res, next) => {
    return next();
})
    .post((req, res, next) => {
});
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