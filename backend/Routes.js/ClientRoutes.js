const express = require("express");
const router = express.Router();
const { getsClientUploadedDocsUnsealed} = require("../controllers/clientController");

router.get("/unsealed/:id", getsClientUploadedDocsUnsealed);



module.exports = router;
