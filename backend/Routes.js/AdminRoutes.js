const express = require("express");
const router = express.Router();
const { getsClientUploadedDocsUnsealed,getsClientUploadedDocssealed,getsPrivateDocs} = require("../controllers/adminController");

router.get("/unsealed/:id", getsClientUploadedDocsUnsealed);
router.get("/sealedFolders/:id",getsClientUploadedDocssealed)
router.get("/privateDocs/:id",getsPrivateDocs)
// router.get("/clientFolders/:id",getClientPublicFolders)
// router.get("/unsealeddocuments/:id",getUnsealedClientDocuments)
// router.get("/filtereddocs/:id",getFilteredClientFolders)

module.exports = router;
