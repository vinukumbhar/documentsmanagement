const express = require("express");
const router = express.Router();
const {moveToSealed,moveClientUploadedDocsToUnsealed,moveClientUploadedDocsToSealed, getsClientUploadedDocsUnsealed,getsClientUploadedDocssealed,getsPrivateDocs,getsClientUploadedDocs} = require("../controllers/adminController");

router.get("/unsealed/:id", getsClientUploadedDocsUnsealed);
router.get("/sealedFolders/:id",getsClientUploadedDocssealed)
router.get("/privateDocs/:id",getsPrivateDocs)
router.get("/clientDocs/:id",getsClientUploadedDocs)
// MOVE from unsealed to sealed
// router.post("/client-docs/move-to-sealed/:id", moveClientUploadedDocsToSealed);
router.post('/:id/move-to-sealed', moveToSealed);
router.post("/client-docs/move-to-unsealed/:id", moveClientUploadedDocsToUnsealed);
// router.get("/clientFolders/:id",getClientPublicFolders)
// router.get("/unsealeddocuments/:id",getUnsealedClientDocuments)
// router.get("/filtereddocs/:id",getFilteredClientFolders)

module.exports = router;
