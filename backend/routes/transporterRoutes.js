const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  assignEarliestAppointment,
  completeRequest,
} = require("../controllers/transporterController");

// Route to assign an appointment
router.post(
  "/assign-appointment",
  authenticate,
  authorize("patient_transporter"),
  assignEarliestAppointment
);
// Route to complete an assigned request
router.put(
  "/:id/complete-request",
  authenticate,
  authorize("patient_transporter"),
  completeRequest
);

// Test routes
router.get("/test", (req, res) => {
  res.send("Route is working");
});

router.get("/test-auth", authorize, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

module.exports = router;
