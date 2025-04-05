const express = require("express");
const router = express.Router();
const { getClientAllFolders ,getClientPublicFolders,getUnsealedClientDocuments,getFilteredClientFolders} = require("./clientDocController");

router.get("/allFolders/:id", getClientAllFolders);
router.get("/clientFolders/:id",getClientPublicFolders)
router.get("/unsealeddocuments/:id",getUnsealedClientDocuments)
router.get("/filtereddocs/:id",getFilteredClientFolders)

module.exports = router;
