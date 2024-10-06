// chefRoutes.js

const express = require("express");
const router = express.Router();
const chefController = require("../controllers/chefController");

// Routes
router.post("/add", chefController.addChef);
router.get("/", chefController.getAllChefs);

router.get("/abilites", chefController.getAllChefAbilities);
router.get("/:ability", chefController.getChefsByAbilities);
router.get("/view/:chef_id", chefController.getChef);
router.get("/status", chefController.checkChefRegistrationStatus);
router.put("/:chef_id", chefController.updateChef);
router.delete("/:chef_id", chefController.deleteChef);
router.post("/approve/:chefId", chefController.approveOrRejectChefRequest);
router.post("/:chef_id/proposal", chefController.addOrEditProposal);
router.get("/:chef_id/proposal", chefController.viewProposal);
router.put("/:chef_id/proposal/:proposal_id", chefController.editProposal);
router.get("/proposals", chefController.getAllProposals);
router.delete(
  "/:chef_id/proposals/:proposal_id",
  chefController.deleteProposal
);

module.exports = router;
