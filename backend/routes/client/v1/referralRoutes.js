const express = require("express");
const router = express.Router();
const ReferralController = require("../../../controller/client/v1/referralController");
const { PLATFORM } = require("../../../constants/authConstant");
const authenticateJWT = require("../../../middleware/loginUser");

router.get(
  "/referral/user",
  authenticateJWT(PLATFORM.CLIENT),
  ReferralController.getAllReferralsofUser
);
module.exports = router;
